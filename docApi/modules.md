[@xhubio/build-base](README.md) / Exports

# @xhubio/build-base

## Table of contents

### Functions

- [copyFiles](modules.md#copyfiles)
- [deleteFiles](modules.md#deletefiles)
- [generalScriptExecuter](modules.md#generalscriptexecuter)
- [getDeletePackageJson](modules.md#getdeletepackagejson)
- [getDeleteTemplateFiles](modules.md#getdeletetemplatefiles)
- [getInitialPackageJson](modules.md#getinitialpackagejson)
- [getInitialTemplateFiles](modules.md#getinitialtemplatefiles)
- [getUpdatePackageJson](modules.md#getupdatepackagejson)
- [getUpdateTemplateFiles](modules.md#getupdatetemplatefiles)
- [packageInsertUpdateEntries](modules.md#packageinsertupdateentries)
- [packageRemoveEntries](modules.md#packageremoveentries)
- [xhubioInitScriptRun](modules.md#xhubioinitscriptrun)
- [xhubioUpdateScriptRun](modules.md#xhubioupdatescriptrun)

## Functions

### copyFiles

▸ **copyFiles**(`params`): `Promise`<`void`\>

Copies the files from the templates folder in to the newly created modules root dir

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `InterfaceCopyFiles` |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Defined in

[copyFiles.ts:28](https://github.com/xhubio/build-base/blob/97f8e5e/src/copyFiles.ts#L28)

___

### deleteFiles

▸ **deleteFiles**(`files`): `Promise`<`void`\>

Deletes a list of given files. If the filenames are relative, then this is
to the root aof the using repository

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | `string`[] | an array of files which should be deleted |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Defined in

[deleteFiles.ts:12](https://github.com/xhubio/build-base/blob/97f8e5e/src/deleteFiles.ts#L12)

___

### generalScriptExecuter

▸ **generalScriptExecuter**(`params`): `InterfaceGeneralScriptExecuterResult`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `InterfaceGeneralScriptExecuter` | The parameter for this function |

#### Returns

`InterfaceGeneralScriptExecuterResult`

result - The result of the script execution

#### Defined in

[generalScriptExecuter.ts:33](https://github.com/xhubio/build-base/blob/97f8e5e/src/generalScriptExecuter.ts#L33)

___

### getDeletePackageJson

▸ **getDeletePackageJson**(): `Promise`<`any`\>

Returns the properties which should be deleted from an existing package file

#### Returns

`Promise`<`any`\>

deletes - An object with all the deletions

#### Defined in

[config/packageJson.ts:35](https://github.com/xhubio/build-base/blob/97f8e5e/src/config/packageJson.ts#L35)

___

### getDeleteTemplateFiles

▸ **getDeleteTemplateFiles**(): `Promise`<`string`[]\>

Returns the list of files whisch schoudl be deleted

#### Returns

`Promise`<`string`[]\>

deleteTemplates - The list of the template file definitions to be deleted

#### Defined in

[config/templateFiles.ts:35](https://github.com/xhubio/build-base/blob/97f8e5e/src/config/templateFiles.ts#L35)

___

### getInitialPackageJson

▸ **getInitialPackageJson**(): `Promise`<`any`\>

Returns the values which should be initialy in a new package.json file

#### Returns

`Promise`<`any`\>

template - A json object which is used as a  package.json template.

#### Defined in

[config/packageJson.ts:16](https://github.com/xhubio/build-base/blob/97f8e5e/src/config/packageJson.ts#L16)

___

### getInitialTemplateFiles

▸ **getInitialTemplateFiles**(): `Promise`<`typyFileHandling`[]\>

Returns the list of initial files to be copied

#### Returns

`Promise`<`typyFileHandling`[]\>

initialTemplates - The list of the initial template file definitions

#### Defined in

[config/templateFiles.ts:17](https://github.com/xhubio/build-base/blob/97f8e5e/src/config/templateFiles.ts#L17)

___

### getUpdatePackageJson

▸ **getUpdatePackageJson**(): `Promise`<`any`\>

Returns the values which should be added or be overwritten in an already
existing package.json file

#### Returns

`Promise`<`any`\>

template - A Json object with all the properties for adding or replace

#### Defined in

[config/packageJson.ts:26](https://github.com/xhubio/build-base/blob/97f8e5e/src/config/packageJson.ts#L26)

___

### getUpdateTemplateFiles

▸ **getUpdateTemplateFiles**(): `Promise`<`typyFileHandling`[]\>

Returns the list of template files which should be updated

#### Returns

`Promise`<`typyFileHandling`[]\>

updateTemplates - The list of the template file definitions to be updated

#### Defined in

[config/templateFiles.ts:26](https://github.com/xhubio/build-base/blob/97f8e5e/src/config/templateFiles.ts#L26)

___

### packageInsertUpdateEntries

▸ **packageInsertUpdateEntries**(`params`): `Promise`<`void`\>

This function compares the template data and the package.json
file of the target repo. Then it will insert or update the key-values
in the target json

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `InterfacePackageInsertUpdateEntries` | The parameter for this function |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Defined in

[packageMaintenance.ts:33](https://github.com/xhubio/build-base/blob/97f8e5e/src/packageMaintenance.ts#L33)

___

### packageRemoveEntries

▸ **packageRemoveEntries**(`params`): `Promise`<`void`\>

This function compares the template data and the package.json
file of the target repo. Then it will remove all the entries form the
template in the target json

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `InterfacePackageInsertUpdateEntries` | The parameter for this function |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Defined in

[packageMaintenance.ts:64](https://github.com/xhubio/build-base/blob/97f8e5e/src/packageMaintenance.ts#L64)

___

### xhubioInitScriptRun

▸ **xhubioInitScriptRun**(): `Promise`<`void`\>

Executes the following steps:
 - Copies all the Template Files
 - prefill the Package.json file

#### Returns

`Promise`<`void`\>

Promise<void>

#### Defined in

[script/xhubioInitScript.ts:15](https://github.com/xhubio/build-base/blob/97f8e5e/src/script/xhubioInitScript.ts#L15)

___

### xhubioUpdateScriptRun

▸ **xhubioUpdateScriptRun**(`args?`): `Promise`<`void`\>

Executes the following steps:
 - Updates files from the template folder
 - Delete files specified
 - Updates the packag.json file
 - Deletes entries from the package.json

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `string`[] |

#### Returns

`Promise`<`void`\>

Promise<void>

#### Defined in

[script/xhubioUpdateScript.ts:26](https://github.com/xhubio/build-base/blob/97f8e5e/src/script/xhubioUpdateScript.ts#L26)
