import { NotFoundException } from '@nestjs/common';

export const createNotFoundException = (entity: string, id: number) =>
  new NotFoundException(
    `The requested ${entity} could not be found. Please verify that the Id '${id}' is correct and try again.`,
  );
