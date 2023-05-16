import { NotFoundException } from '@nestjs/common';

/**
 * Creates a NotFoundException with a customized message for a requested entity.
 * @param {string} entity - The entity being requested (e.g., "dish").
 * @param {number} id - The ID of the entity that could not be found.
 * @returns {NotFoundException} A NotFoundException with the customized message.
 */
export const createNotFoundException = (
  entity: string,
  id: number,
): NotFoundException =>
  new NotFoundException(
    `The requested ${entity} could not be found. Please verify that the Id '${id}' is correct and try again.`,
  );
