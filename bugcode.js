
                // fs.readFile('./usedPhone.txt',"utf8", (err, data) =>{
                //     if(err){console.log(err);}else{
                //         const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
                //         for(let i of arr) {
                //             if (phonedata === i){
                //                 console.log(i)
                //                 console.log("This is not a Unique Number")
                //                 nodescript()
                //             }else{
                //                 console.log('This is an Unique number')
                //                 console.log(i)
                //                 // Post Logic to delete the top Number
                //                 fs.readFile('./userPhone.txt', function(err, data) { // read file to memory
                //                     if (!err) {
                //                         data = data.toString(); // stringify buffer
                //                         var position = data.toString().indexOf('\n'); // find position of new line element
                //                         if (position != -1) { // if new line element found
                //                             data = data.substr(position + 1); // subtract string based on first line length
                                
                //                             fs.writeFile('./userPhone.txt', data, function(err) { // write file
                //                                 if (err) { // if error, report
                //                                     console.log (err);
                //                                 }
                //                             });
                //                         } else {
                //                             console.log('no lines found');
                //                         }
                //                     } else {
                //                         console.log(err);
                //                     }
                //                 })
                //                 break;
                //             }
                //         }
                //     }
                // })