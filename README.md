# kickertech-assignment

Files reader:

1. When the program starts, it should read defined directory files and save it to redux state object.
2. Program should be able to return full list of files from state  on http://127.0.0.1:3000/list
{
	name: 'File_name.jpg',
	active: true
}
3. Program should have functionality to scan defined PATH again. After rescan, redux state object should be updated, marking old files {active: false} if they are not available anymore. http://127.0.0.1:3000/scan
4. Program should be able to download the current existing state object. http://127.0.0.1:3000/download-state
[{
	name: 'File_name.jpg',
	active: true
},
{
	name: 'File_name2.jpg',
	active: false
}]

## Start dev server

1. Add .env file with DIRECTORY_PATH=value.
2. Run pnpm install & pnpm dev
