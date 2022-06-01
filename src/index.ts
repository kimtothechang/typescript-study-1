import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(public prevHash: string, public height: number, public data: string) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    else return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);

    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const myChain = new BlockChain();

myChain.addBlock('gogo');
myChain.addBlock('hoho');
myChain.addBlock('jojo');

console.log(myChain.getBlocks());
