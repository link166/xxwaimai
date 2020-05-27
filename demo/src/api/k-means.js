let orginArr = [
        [2, 1],
        [1, 2],
        [2, 2],
        [3, 2],
        [2, 3],
        [3, 3],
        [2, 4],
        [3, 5],
        [4, 4],
        [5, 3]
    ]
    // let i = 0
    // let obj = {}
    // orginArr.forEach(p => {
    //     obj.[i] = {
    //         x: p[0],
    //         y: p[1],
    //         toP1: 0,
    //         toP2: 0
    //     }
    //     i++
    // })

// 双指针设立两个中心，这里假设是p1,p2
let p1 = [2, 1]
let p2 = [1, 2]

while (true) {
    let lenTop1 = []
    let lenTop2 = []
    for (let i of orginArr) {
        if (lenTop1 && lenTop2) {
            console.log(i)
            let lenXTop1 = Math.abs(i[0] - p1[0])
            let lenYTop1 = Math.abs(i[1] - p1[1])
            let lenP1 = Math.sqrt(Math.pow(lenXTop1, 2) + Math.pow(lenYTop1, 2))
            console.log(lenP1)
            let lenXTop2 = Math.abs(i[0] - p2[0])
            let lenYTop2 = Math.abs(i[1] - p2[1])
            let lenP2 = Math.sqrt(Math.pow(lenXTop2, 2) + Math.pow(lenYTop2, 2))
            console.log(lenP2)
            lenP1 > lenP2 ? lenTop1.push(i) : lenTop2.push(i)
        }
    }
    console.log(lenTop2)
    console.log(lenTop1)
    break
}