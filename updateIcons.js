const fs = require('fs');

const makeSvg = (text, color, fontSize) => {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" fill="rgba(8,13,24,0.8)" rx="24" stroke="" stroke-width="4"/><text x="64" y="80" fill="" font-family="monospace" font-size="" font-weight="bold" text-anchor="middle"></text></svg>;
};

const asmSvg = makeSvg('ASM', '#00e6d6', 44);
const nasmSvg = makeSvg('NASM', '#00e6d6', 32);
const idaSvg = makeSvg('IDA', '#ff8f00', 44);
const ghidraSvg = makeSvg('GHIDRA', '#db2828', 26);
const radare2Svg = makeSvg('R2', '#ffffff', 50);

const encode = (svg) => 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

const techStackIcons = \const techStackIcons = [
  { name: 'ASM', url: '\' },
  { name: 'NASM', url: '\' },
  { name: 'IDA Pro', url: '\' },
  { name: 'Ghidra', url: '\' },
  { name: 'Wireshark', url: 'https://cdn.simpleicons.org/wireshark/1679A7' },
  { name: 'Radare2', url: '\' },
  { name: 'Unity', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg' },
  { name: 'Unreal', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg' },
  { name: 'Godot', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'C#', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { name: 'Android', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
  { name: 'Blender', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'Kali Linux', url: 'https://cdn.simpleicons.org/kalilinux/5578ff' }
]\;

let content = fs.readFileSync('e:/GitHub/Portfolio/Portfolio_Website/src/App.jsx', 'utf8');

const start = content.indexOf('const techStackIcons = [');
const end = content.indexOf(']', start) + 1;

if(start !== -1 && end !== 0) {
  content = content.substring(0, start) + techStackIcons + content.substring(end);
  fs.writeFileSync('e:/GitHub/Portfolio/Portfolio_Website/src/App.jsx', content);
  console.log('Replaced successfully');
} else {
  console.log('Could not find array');
}
