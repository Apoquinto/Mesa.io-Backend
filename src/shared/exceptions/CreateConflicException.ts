import { ConflictException } from '@nestjs/common';

export const createConflicException = (
  entity: string,
  field: string,
  value: string,
) =>
  new ConflictException(
    `Unable to create the dish. The selected ${field} '${value}' is already in use. Please choose a different ${field} for the ${entity}.`,
  );
