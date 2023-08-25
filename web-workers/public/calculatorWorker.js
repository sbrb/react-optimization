self.addEventListener('message', (e) => {
    const { data } = e;
    let result = 0;

    for (let i = 1; i <= data; i++) {
        result += i;
    }

    self.postMessage(result);
});
