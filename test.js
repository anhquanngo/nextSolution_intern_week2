// function sayHello(){
//     console.log("HELLO !!")
// }
// sayHello();

// function logSaying(fn){
//     fn();
// }

// logSaying(sayHello);

// var sayGoodBye = function(){
//     console.log("Good bye!!");
// }
// sayGoodBye();

// var person = {
//     firstName: "Anh",
//     lastName: "Quan",
//     saySomeThing: function(){
//         console.log("Hello," +  this.firstName + this.lastName)
//     }
// }

// person.saySomeThing();
// var aName = "firstName";
// console.log(person[aName])

// //vidu Callbacks
// function printString(string, Callback){
// setTimeout(
//         ()=>{
//             console.log(string)
//             Callback()
//         },
//         Math.floor(Math.random() * 100) + 1
//     )
// }

// function printAll(){
//     printString("A", () => {
//         printString("B", () => {
//             printString("C", () =>{})
//         })
//     })
// }

// printAll()
//vidu Promises
// function printString(string){
//     return new Promise((resolve, reject) => {
//       setTimeout(
//         () => {
//          console.log(string)
//          resolve()
//         }, 
//        Math.floor(Math.random() * 100) + 1
//       )
//     })
//   }

//   function printAll(){
//     printString("A")
//     .then(() => {
//       return printString("B")
//     })
//     .then(() => {
//       return printString("C")
//     })
//   }
//   printAll()

//   function printAll(){
//     printString("A")
//     .then(() => printString("B"))
//     .then(() => printString("C"))
//   }
//   printAll()

//vidu async
// async function printAll(){
//     await printString("A")
//     await printString("B")
//     await printString("C")
// }

// printAll()

// Biến này dùng để theo dõi số Promise đang được thực thi tại một thời điểm
let counter = 0;
let interval;
// Tổng số hành động
const numberOfOperations = 10;
// Arguments cho mỗi hành động
const listOfArguments = [];
// Delay các hành động để fake bất đồng bộ
const listOfDelays = [];
 
// Fill mảng argument và delay cho các hành động được thực thi
// Mỗi giá trị delay được ngẫu nhiên trong khoảng 1000 tới 10000 milisecond
for (let i = 0; i < numberOfOperations; i++) {
  listOfArguments.push(i);
  listOfDelays.push(Math.ceil(Math.random() * 1) * 1000);
}
 
// Fake bất đồng bộ: resolve một mảng sau một khoảng thời gian tuỳ ý
// Tăng biến counter để theo dõi số promise được thực thi mỗi giây
const asyncOperation = index => {
  counter++;
  return new Promise(resolve =>
    setTimeout(() => {
      counter--;
      resolve(index);
      console.log('Operation performed:' + index);
    }, listOfDelays[index]))
};
 
// Hàm in ra số Promise được thực thi mỗi giây (để theo dõi)
const watchCounter = () => {
  console.log('Promises running in the beginning:', counter);
 
  if (interval) {
    clearInterval(interval);
  }
 
  interval = setInterval(() => console.log('Promises running:', counter), 1000);
};

async function take0() {
    // Quẩy thôi
    const results = [];
    for (const argument of listOfArguments) {
      const index = await asyncOperation(argument);
      results.push(index);
    }
    return results;
  }

  async function take1() {
    // Running Promises in parallel
    const listOfPromises = listOfArguments.map(asyncOperation);
    // Harvesting
    const results = [];
    for (const promise of listOfPromises) {
      const index = await promise;
      results.push(index);
    }
    return results;
  }

  async function take2() {
    // Chạy promise song song
    const listOfPromises = listOfArguments.map(asyncOperation);
    // Lấy kết quả trả về
    return await Promise.all(listOfPromises);
  }

  async function take3subtake0() {
    const concurrencyLimit = 2;
    let results = [];
    const batchesCount = Math.ceil(numberOfOperations / concurrencyLimit);
   
    // Chạy Promise song song trong từng vòng lặp batch
    for (let i = 0; i < batchesCount; i++) {
      const batchStart = i * concurrencyLimit;
      const batchArguments = listOfArguments.slice(batchStart, batchStart + concurrencyLimit);
      const batchPromises = batchArguments.map(asyncOperation);
      // Harvesting
      const batchResults = await Promise.all(batchPromises);
      results = results.concat(batchResults);
    }
    return results;
  }

  async function take3subtake1part0() {
    const concurrencyLimit = 5;
    const argsCopy = listOfArguments.slice();
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());
    // Đưa promise liên tiếp vào chuỗi thực thi
    function chainNext(p) {
      if (argsCopy.length) {
        const arg = argsCopy.shift();
        return p.then(() => {
          const operationPromise = asyncOperation(arg);
          return chainNext(operationPromise);
        })
      }
      return p;
    }
   
    await Promise.all(promises.map(chainNext));
  }

  async function take3subtake1part1() {
    const concurrencyLimit = 5;
    // Tạo index cho array
    const argsCopy = [].concat(listOfArguments.map((val, ind) => ({ val, ind })));
    const result = new Array(listOfArguments.length);
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());
    // Đưa promise liên tiếp vào chuỗi thực thi
    function chainNext(p) {
      if (argsCopy.length) {
        const arg = argsCopy.shift();
        return p.then(() => {
          // Lưu kết quả vào array khi Promise chạy xong
          const operationPromise = asyncOperation(arg.val).then(r => { result[arg.ind] = r; });
          return chainNext(operationPromise);
        });
      }
      return p;
    }
   
    await Promise.all(promises.map(chainNext));
    return result;
  }

  watchCounter();
  take3subtake1part1();