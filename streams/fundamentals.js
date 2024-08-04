// no node toda porta de saida e entrada é um serviço de streams, ele consegue enviar ou receber arquivos aos poucos
// o .pipe é uma forma de encaminhar 
// process.stdin
//     .pipe(process.stdout)
// dentro de streans eu nunca posso trabalhar com números ou outra varivel primitiva tem que usar o Buffer const buf = Buffer.from(String(i));

import { Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1;

    _read() {
        const i = this.index++

        setTimeout(()=>{
            if(i > 100) {
                this.push(null);
            }else{
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        },1000)
    
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString())*10)
        callback()
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1;
        callback(null, Buffer.from(String(transformed)));
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());