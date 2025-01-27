import { serverHttp, porta } from './http';
import './websocket';

serverHttp.listen(porta, () => {
    console.log('server rodando em ' + porta);
});