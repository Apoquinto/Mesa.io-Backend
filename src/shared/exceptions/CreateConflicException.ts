import { ConflictException } from '@nestjs/common';

/**
 * Creates a ConflictException with a customized message for creating a dish.
 * @param {string} entity - The entity related to the conflict (e.g., "dish").
 * @param {string} field - The field causing the conflict (e.g., "name").
 * @param {string} value - The value causing the conflict (e.g., "Pizza").
 * @returns {ConflictException} A ConflictException with the customized message.
 */
export const createConflicException = (
  entity: string,
  field: string,
  value: string,
): ConflictException =>
  new ConflictException(
    `Unable to create the ${entity}. The selected ${field} '${value}' is already in use. Please choose a different ${field} for the ${entity}.`,
  );
