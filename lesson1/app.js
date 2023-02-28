// const path = require('path');
//
// const joinedPath = path.join(__dirname,'folder5', 'test5.js')
// console.log(joinedPath);
//
//
 const fs = require('fs');
 const path = require('path')

fs.readdir(path.join('BigFolder'), {withFileTypes: true},(err, data)=>{
  if (err) throw new Error();
  console.log(data);
})
// fs.stat(path.join('BigFolder'), (err, stats)=>{
//   if (err) throw new Error();
//   console.log(stats.isDirectory());
//   console.log(stats.isFile());
// })

// fs.mkdir(path.join('BigFolder'), (err) => {
//     if (err) throw new Error('error')
// })
// --folder 1
// fs.mkdir(path.join('BigFolder', 'folder1'),(err) => {
//     if (err) throw new Error('error')
// });

// --folder 2
// fs.mkdir(path.join('BigFolder', 'folder2'),(err) => {
//     if (err) throw new Error('error')
// });

// --folder 3
// fs.mkdir(path.join('BigFolder', 'folder3'),(err) => {
//     if (err) throw new Error('error')
// });

// --folder 4
// fs.mkdir(path.join('BigFolder', 'folder4'),(err) => {
//     if (err) throw new Error('error')
// });

// --folder 5
// fs.mkdir(path.join('BigFolder', 'folder5'),(err) => {
//     if (err) throw new Error('error')
// });
