import { DataResponse } from './DataResponse';

/**
 * Creates a DataResponse object with the specified parameters.
 * @param {string} entity - The entity related to the response (e.g., "dish").
 * @param {string} stage - The stage of the operation (e.g., "created", "updated", etc.).
 * @param {number} id - The ID of the entity.
 * @param {T} result - The result data associated with the response.
 * @returns {DataResponse<T>} A DataResponse object with the specified parameters.
 * @template T
 */
export function createDataResponse<T>(
  entity: string,
  stage: string,
  id: number,
  result: T,
): DataResponse<T> {
  return {
    title: `${stage} successfully`,
    message: `The ${entity} '${id}' has been ${stage} successfully.`,
    result,
  };
}
