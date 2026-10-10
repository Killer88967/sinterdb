/**
 * Lets the server hold replies until the storage engine has flushed the writes
 * they depend on, so many writes share one flush.
 */
export interface DurabilityBarrier {
  /** True while some applied writes are not yet on stable storage. */
  readonly hasPending: boolean;
  /**
   * Calls `callback` once those writes are flushed, or with the when the
   * flush fails. Callbacks run in the order they were added.
   */
  whenDurable(callback: (error?: unknown) => void): void;
}

export interface Committable {
  readonly hasUncommittedWrites: boolean;
  commit(): void;
}

export class GroupCommitter implements DurabilityBarrier {
  private waiting: ((error?: unknown) => void)[] = [];
  private scheduled = false;

  public constructor(private readonly engine: Committable) {}

  public get hasPending(): boolean {
    return this.engine.hasUncommittedWrites;
  }

  public whenDurable(callback: (error?: unknown) => void): void {
    this.waiting.push(callback);

    if (!this.scheduled) {
      this.scheduled = true;
      setImmediate(() => this.run());
    }
  }

  private run(): void {
    this.scheduled = false;

    const callbacks = this.waiting;

    this.waiting = [];

    let failure: unknown;

    try {
      this.engine.commit();
    } catch (error: unknown) {
      failure = error ?? new Error("The log flush failed.");
    }

    for (const callback of callbacks) {
      callback(failure);
    }
  }
}
