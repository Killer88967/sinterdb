import { MAX_REQUEST_ID, MIN_REQUEST_ID } from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";

export class RequestIdGenerator {
  private current: number;

  public constructor(initialValue = MIN_REQUEST_ID) {
    validateInitialValue(initialValue);
    this.current = initialValue;
  }

  public next(): number {
    const requestId = this.current;

    this.current =
      requestId === MAX_REQUEST_ID ? MIN_REQUEST_ID : requestId + 1;

    return requestId;
  }
}

function validateInitialValue(value: number): void {
  if (
    !Number.isInteger(value) ||
    value < MIN_REQUEST_ID ||
    value > MAX_REQUEST_ID
  ) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidRequestId,
      `Initial request ID must be an integer between ${MIN_REQUEST_ID} and ${MAX_REQUEST_ID}.`,
    );
  }
}
