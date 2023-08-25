import { useState } from 'react';

const useWebWorker = (workerScript) => {
    const [result, setResult] = useState(null);

    const executeCalculation = (inputValue) => {
        if (typeof Worker !== 'undefined') {
            const worker = new Worker(workerScript);
            worker.postMessage(inputValue);

            worker.addEventListener('message', (e) => {
                setResult(e.data);
                worker.terminate();
            });
        }
    };

    return { result, executeCalculation };
};

export default useWebWorker;
