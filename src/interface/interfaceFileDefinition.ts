/**
 * Interface for a single file definition
 */
export interface InterfaceFileDefinition {
  src: string
  dest: string
}

export type typyFileHandling = string | InterfaceFileDefinition
