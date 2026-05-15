import fs from 'fs';

function makeSvg(text, color, width=128) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 128"><rect width="${width}" height="128" fill="rgba(8,13,24,0.8)" rx="24" stroke="${color}" stroke-width="4"/><text x="${width/2}" y="80" fill="${color}" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">${text}</text></svg>`;
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

const icons = [
  { name: 'Assembly', url: makeSvg('ASM', '#00e6d6') },
  { name: 'NASM', url: makeSvg('NASM', '#c60000') },
  { name: 'IDA Pro', url: makeSvg('IDA', '#ff8f00') },
  { name: 'Ghidra', url: makeSvg('GHIDRA', '#db2828', 128) },
  { name: 'Radare2', url: makeSvg('RADARE2', '#ff0000', 140) },
  { name: 'Wireshark', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wireshark.svg' },
  { name: 'Kali Linux', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kalilinux.svg' },
  { name: 'Burp Suite', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/burpsuite.svg' },
  { name: 'Nmap', url: makeSvg('NMAP', '#3366cc') },
  { name: 'Metasploit', url: makeSvg('MSF', '#2d6dcc') },
  { name: 'Unity', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg' },
  { name: 'Unreal', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg' },
  { name: 'Godot', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg' },
  { name: '3ds Max', url: makeSvg('3DS MAX', '#39bcab', 140) },
  { name: 'Marmoset', url: makeSvg('MARMOSET', '#8f8f8f', 140) },
  { name: 'Substance', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobesubstance3dpainter.svg' },
  { name: 'Photoshop', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg' },
  { name: 'Krita', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/krita.svg' },
  { name: 'Clip Studio', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/clipstudiopaint.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'C#', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { name: 'Android', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
  { name: 'Blender', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' }
];

let appStr = fs.readFileSync('src/App.jsx', 'utf8');

// Replace techStackIcons safely
const iconStart = appStr.indexOf('const techStackIcons = [');
const iconEnd = appStr.indexOf('const skillGroups = [');
const newIconStr = 'const techStackIcons = ' + JSON.stringify(icons, null, 2) + '\n\n';

appStr = appStr.substring(0, iconStart) + newIconStr + appStr.substring(iconEnd);

// Replace skillGroups safely
const sgStart = appStr.indexOf('const skillGroups = [');
const sgEnd = appStr.indexOf('const workExperience = [');

const skillGroups = [
  {
    title: 'Game Development',
    items: [
      'Unity, Unreal Engine, Godot',
      'Combat systems, movement mechanics, AI, physics, animation, UI implementation',
      'Prototyping, debugging, optimization, scripting',
    ],
  },
  {
    title: 'Reverse Engineering & Cybersecurity',
    items: [
      'Assembly, NASM, C, C++',
      'IDA Pro, Ghidra, Radare2 for disassembling and static analysis',
      'Wireshark for network protocol analysis and packet sniffing',
      'Penetration testing, vulnerability assessments, exploit testing',
      'Debugging, dynamic analysis, and security tooling research'
    ],
  },
  {
    title: 'Programming and Software Development',
    items: [
      'Java, C#, C++, C, Python, JavaScript, SQL',
      'Node.js, React.js, Django, Express.js',
      'OOP, REST APIs, Git, software architecture',
    ],
  },
  {
    title: 'Art and Creative Tools',
    items: [
      'Blender, 3ds Max, ZBrush',
      'Adobe Substance 3D Painter, Marmoset Toolbag for texturing and baking',
      'Photoshop, Krita, Clip Studio Paint for 2D art and concepting',
      '3D modeling, rigging, texture mapping, VFX',
    ],
  },
  {
    title: 'Android and Web Development',
    items: [
      'Android application development using Java and Android SDK',
      'Frontend development with React.js',
      'Backend development using Node.js, Express.js, and Django',
      'API, database, authentication integration, and deployment',
    ],
  }
];

const newSgStr = 'const skillGroups = ' + JSON.stringify(skillGroups, null, 2) + '\n\n';
appStr = appStr.substring(0, sgStart) + newSgStr + appStr.substring(sgEnd);

// Clean up standard keys to not use strings
appStr = appStr.replace(/"name":/g, 'name:').replace(/"url":/g, 'url:').replace(/"title":/g, 'title:').replace(/"items":/g, 'items:');

fs.writeFileSync('src/App.jsx', appStr);
console.log('App.jsx successfully updated cleanly.');
