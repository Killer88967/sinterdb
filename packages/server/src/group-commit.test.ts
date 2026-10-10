import { describe, expect, it, vi } from "vitest";

import { GroupCommitter } from "./group-commit.js";

function engine(pending = true) {
  return {
    hasUncommittedWrites: pending,
    commit: vi.fn(),
  };
}

describe("GroupCommitter", () => {
  it("reports whether the engine has writes waiting", () => {
    expect(new GroupCommitter(engine(true)).hasPending).toBe(true);
    expect(new GroupCommitter(engine(false)).hasPending).toBe(false);
  });

  it("flushes once for every waiter added in the same turn", async () => {
    const fake = engine();
    const committer = new GroupCommitter(fake);
    const order: number[] = [];

    committer.whenDurable(() => order.push(1));
    committer.whenDurable(() => order.push(2));
    committer.whenDurable(() => order.push(3));

    expect(fake.commit).not.toHaveBeenCalled();

    await new Promise((resolve) => setImmediate(resolve));

    expect(fake.commit).toHaveBeenCalledOnce();
    expect(order).toEqual([1, 2, 3]);
  });

  it("flushes again for waiters that arrive in a later turn", async () => {
    const fake = engine();
    const committer = new GroupCommitter(fake);

    committer.whenDurable(() => undefined);
    await new Promise((resolve) => setImmediate(resolve));
    committer.whenDurable(() => undefined);
    await new Promise((resolve) => setImmediate(resolve));

    expect(fake.commit).toHaveBeenCalledTimes(2);
  });

  it("passes a flush failure to every waiter", async () => {
    const fake = engine();
    const failure = new Error("disk full");

    fake.commit.mockImplementation(() => {
      throw failure;
    });

    const committer = new GroupCommitter(fake);
    const received: unknown[] = [];

    committer.whenDurable((error) => received.push(error));
    committer.whenDurable((error) => received.push(error));
    await new Promise((resolve) => setImmediate(resolve));

    expect(received).toEqual([failure, failure]);
  });

  it("reports success as no error", async () => {
    const committer = new GroupCommitter(engine());
    const received: unknown[] = [];

    committer.whenDurable((error) => received.push(error));
    await new Promise((resolve) => setImmediate(resolve));

    expect(received).toEqual([undefined]);
  });
});
