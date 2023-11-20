//@ts-check
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { compile } from './compile';
import { execute } from './execute';

//Initialize the javascript editor
const jsEditor = monaco.editor.create(document.getElementById('js-editor-container'), {
  value: '//Here goes your Javascript\n',
  language: 'javascript',
});

//Initialize the json editor
const jsonEditor = monaco.editor.create(document.getElementById('json-editor-container'), {
  value: '\n',
  language: 'json',
});

//Compile script upon click
const compileButton = document.getElementById('compile-button');
compileButton.addEventListener('click', () => compile(jsEditor, jsonEditor));

//Run the Json spec upon click
const runButton = document.getElementById('run-button');
runButton.addEventListener('click', () => execute(jsonEditor));
