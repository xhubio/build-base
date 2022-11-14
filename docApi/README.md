@xhubio/build-base / [Exports](modules.md)

# @xhubio/build-base

# Why should I care about this module?

For none mono-repositories this module reduces the effort to handle a
lot of repositories. It provides methods to update and maintain already
created repositories.

It uses [GitHub actions](https://github.com/features/actions) for the
continuous integration process. Dependabot is used to automatically
update dependencies.

Makes it easy to create a new repository from scratch and set it up with
all the files to have a 'working' module. So it helps to unify all the
repos.

Just follow the instructions and give it a try.

To make this working you need to set an organisational access token for
each repository. The name of the secret must be:
'PACKAGE\_GITHUB\_TOKEN'.

## Script

Describes the available scripts for initial creation and maintenance.

## How to use this module

The aim of this module ist to provide an easy way to setup new
repositories and to maintain the exiting ones.

### Local Set Up

To be able to download packages from the organisation level you need to
configure a [GitHub Personal Access
Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
with at least `ReadPackages` permission.

Later create (or update) a `./npmrc` file in your `$HOME` folder with
the following content:

    @onrunning:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=<YOUR_PERSONAL_GIT_HUB_TOKEN>

### Package.json

To maintain or configure the 'package.json' file the following files
needs to be maintained.

-   `src/config/packageInitial.json`  
    All the values entered here will be used to create a new
    'package.json' file.

-   `src/config/packageUpdate.json`  
    All the values entered here will be updated or added with the
    command.

-   `src/config/packageDelete.json`  
    All the values entered here will be delete with the command.

### Files

To maintain the configuration files the following files need to be
maintained

-   `src/config/templateFilesInitial.json`  
    The array contains a list of files to be copied from the templates
    folder into the new repository.

        Some of these files have a meaning even in the template folder of this repository so they must be renamed.
        For this teh array could also have an object where the source name could be different from the target name.

        .example for file names
        [source.json]
        ----
        [
          ".releaserc.json",         
          {                          
            "dest": ".gitignore",
            "src": "gitignore"
          },
        ]
        ----
        <1> Just a file name.
        <2> The name of the source file is different to the target file.

-   `src/config/templateFilesUpdate.json`  
    The list of files to be updated or added. The 'onUpdate' will
    overwrite files only if called with the 'force' option.

-   `src/config/templateFilesDelete.json`  
    The array contains a list of filenames relative to the root project
    which should be deleted from the maintained repository.

#### onInit

Creates an initial new project for a lib.

    mkdir <name of new repo>
    cd <name of new repo>
    git init

**Cloned repo**

    git clone @yourOrg/repo-name
    cd repo-name

**Once in the project folder**

    npm init --yes                                  
    npm install --save-dev @xhubio/build-base  
    npx xhubio-scripts-lib xhubioInit                       

-   Creates an initial `package.json` file.

-   Adds the base module `@onrunning/cil-base-lib` as a `devDependency`.

-   Executes the init script.

After this the following entries needs to be updated in the
'package.json' file.

    {
      "name": "your-name-xxx",                                   
       "repository": {
        "url": "https://github.com/yourOrg/your-name--xxx.git"   
      }
    }

-   The name must be changed from 'cil-logistic-xxx' to
    '@yourOrg/your-name—​xxx'

-   Enter the correct name of the repo

## onUpdate

Updates existing configuration files. Also updates the `package.json`
file.

    npm run onUpdate       
    npm run onUpdate force 
    npm run onUpdate clean 

-   Only and new files or entries in the `package.json` and delete
    files.

-   Also overwrite existing files and entries in the `package.json`.

-   Only relevant for `package.json`. It resets the file to the current
    init state.

## Documentation generation

To generate documentation execute

    npm run doc

the following tools needs to be installed:

-   asciidoctor

-   asciidoctor-pdf

-   asciidoctor-diagram

-   pandoc

To install all of these run the following commands:

    $ brew install asciidoctor
    $ brew install pandoc

For asciidoctor-diagram run the following commands:

    $ gem install asciidoctor-diagram
    $ bundle