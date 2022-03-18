function main() {
    setTimeout(function () {
        console.log("2 srgundos")
        setTimeout(function () {
            console.log("4 +2 srgundos")
        }, 4000);
    }, 2000);
}
main();