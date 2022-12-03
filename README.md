# Setup

With `node` 12+, run : `npm ci`

Then, on a daily basis, execute `./create-new.sh` script everyday to prepare your workspace with new content (source, tests, inputs)

# Results

Results are available publicly (with my personal input seeds) into
[this google spreadsheet](https://docs.google.com/spreadsheets/d/1JbXFDJBsfKLYu7vhR1ywEHf9_Cd7pZsiTCEJCLFvohc/edit?usp=sharing)

Every DAY will have 1 dedicated spreadsheet tab with some formula calling scripts defined in src/*.ts files.


# Deploy

- Authenticate with `clasp` (google app script CLI) with `npx clasp login` (follow instructions)  
  Note: `clasp` is a CLI to manage your Google App Scripts, and it's powered by Google (more infos [here](https://codelabs.developers.google.com/codelabs/clasp/))

- Enable app script API here : https://script.google.com/home/usersettings

- Reference a google app script :
  - If you want a standalone appscript (without any backed google spreadsheet linked to it),
    run `npx clasp create --type api` : a new google app script should be created under your google account (url to edit it will be provided)  
    ⚠️ In that case, a `.clasp.json` is going to be created and should not be added into git, otherwise people may have access to your script !
  - If you already have a google spreadsheet, open its linked Google App Script (through `Extensions` menubar) and create
    a `.clasp.json` file at the root of this repository, with following content :
    ```
    {"scriptId":"<Put here the google app script id you can find in the url when opening it>"}
    ```
    ⚠️ Like above, don't add this file into git, as it may represent a security issue.

- Run `npx clasp push` (or `npx clasp push --watch` if you want to edit/auto-deploy some changes made to the script)
  - `Manifest file has been updated. Do you want to push and overwrite?` => Answer "Yes" here
    Files are going to be compiled and pushed into your Google App Script.

- Open your app script at any moment by running `npx clasp open`
