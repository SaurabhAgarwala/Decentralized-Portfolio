import Portis from "@portis/web3";
import Web3 from "web3";
// import "https://cdn.jsdelivr.net/npm/@portis/web3@3.0.2/umd/index.js";

//-----1
// const myPrivateEthereumNode = {
//   nodeUrl: "https://rpc-mumbai.matic.today",
//   chainId: 80001
// };
// const portis = new Portis(
//   "134f0fc4-ad89-4325-873a-1735e74a5c78",
//   myPrivateEthereumNode
// );
//-----1

// alert("REg JS Loaded");

//-----2
const portis = new Portis("134f0fc4-ad89-4325-873a-1735e74a5c78", "kovan");
//----2

const web3 = new Web3(portis.provider);
// web3.eth.defaultAccount = accounts[0]

web3.eth
  .getAccounts()
  .then((accounts) => window.reginit(accounts))
  .catch((error) => console.log(error));

let contract;

window.reginit = async function (accounts) {
  console.log(accounts[0]);
  console.log("Start");

  let abi = [
    {
      inputs: [
        {
          internalType: "address[]",
          name: "tkns",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "amnt",
          type: "uint256[]"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokens",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "_to",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokens",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [],
      name: "_totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenOwner",
          type: "address"
        },
        {
          internalType: "address",
          name: "spender",
          type: "address"
        }
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "remaining",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "amount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokens",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenOwner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        }
      ],
      name: "executeProposal",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "unit",
          type: "uint256"
        }
      ],
      name: "issue",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "newOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "proposals",
      outputs: [
        {
          internalType: "address",
          name: "fromToken",
          type: "address"
        },
        {
          internalType: "address",
          name: "toToken",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "perc",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "initiator",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "agree",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "disagree",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "fToken",
          type: "address"
        },
        {
          internalType: "address",
          name: "tToken",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "per",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      name: "propose",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "a",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "b",
          type: "uint256"
        }
      ],
      name: "safeAdd",
      outputs: [
        {
          internalType: "uint256",
          name: "c",
          type: "uint256"
        }
      ],
      stateMutability: "pure",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "a",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "b",
          type: "uint256"
        }
      ],
      name: "safeDiv",
      outputs: [
        {
          internalType: "uint256",
          name: "c",
          type: "uint256"
        }
      ],
      stateMutability: "pure",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "a",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "b",
          type: "uint256"
        }
      ],
      name: "safeMul",
      outputs: [
        {
          internalType: "uint256",
          name: "c",
          type: "uint256"
        }
      ],
      stateMutability: "pure",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "a",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "b",
          type: "uint256"
        }
      ],
      name: "safeSub",
      outputs: [
        {
          internalType: "uint256",
          name: "c",
          type: "uint256"
        }
      ],
      stateMutability: "pure",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "tokensAddr",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokens",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokens",
          type: "uint256"
        }
      ],
      name: "transferAnyERC20Token",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokens",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "ttlproposals",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "proposalId",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "vote",
          type: "bool"
        }
      ],
      name: "voteForProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "unit",
          type: "uint256"
        }
      ],
      name: "withdraw",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    }
  ];

  contract = web3.eth.Contract(
    abi,
    "0x129f88F0Acdc679c6b7125c9d12a3D441736dBdF"
  );

  let account = accounts[0];
  web3.eth.defaultAccount = account;

  window.getDetails();
};

window.issue = async function () {
  // alert(document.getElementById("MobNo").value);
  var numTok = document.getElementById("numTokens").value;
  // var name = document.getElementById("name").value;

  let tx = await contract.methods.issue(parseInt(numTok)).send();
  console.log(tx);
  console.log(numTok);
  // console.log(name);
  // transactionHash
  // alert(tx.transactionHash);
  alert(
    "Invested in portfolio successfully.\n you can see the transaction here :: https://kovan.etherscan.io/tx/" +
      tx.transactionHash
  );
  // alert("do something");
  // console.log("do something ");
};

window.withdraw = async function () {
  // alert(document.getElementById("MobNo").value);
  var numTok = document.getElementById("numTokens").value;
  // var name = document.getElementById("name").value;

  let tx = await contract.methods.withdraw(parseInt(numTok)).send();
  console.log(tx);
  console.log(numTok);
  // console.log(name);
  // alert("Withdrawn  Successfully");

  alert(
    "Funds has been ithdrawn Successfully.\n you can see the transaction here :: https://kovan.etherscan.io/tx/" +
      tx.transactionHash
  );
  // let tx1 = await contract.methods.proposals(1).call();
  // alert(tx1);
  // console.log(tx1);

  // alert("do something");
  // console.log("do something ");
};

window.propose = async function () {
  var ftoken = document.getElementById("ftoken").value;
  var ttoken = document.getElementById("ttoken").value;
  var perc = document.getElementById("perc").value;

  let tx = await contract.methods
    .propose(ftoken, ttoken, parseInt(perc), parseInt(120))
    .send();
  console.log(tx);
  // console.log(name);
  // alert("Proposed");

  alert(
    "You have proposed a new strategy successfully.\n you can see the transaction here :: https://kovan.etherscan.io/tx/" +
      tx.transactionHash
  );
};

window.vote = async function (id, vt) {
  let tx = await contract.methods.voteForProposal(id, vt).send();
  console.log(tx);
  // console.log(name);
  alert(
    "You have voted successfully.\n you can see the transaction here :: https://kovan.etherscan.io/tx/" +
      tx.transactionHash
  );
};

window.execute = async function (id) {
  let tx = await contract.methods.executeProposal(id).send();
  console.log(tx);
  // console.log(name);
  // alert("executed");
  alert(
    "You have executed strategy successfully.\n you can see the transaction here :: https://kovan.etherscan.io/tx/" +
      tx.transactionHash
  );
};

window.getDetails = async function () {
  let st = "";
  const symbol = "DPO";
  console.log(symbol);
  const ttlSuply = await contract.methods._totalSupply().call();
  console.log(ttlSuply);
  st +=
    '<h1 id="detailhead"><i>Portfolio Information:</i></h1> \
  <p id="details" style="font-size:170%"> <br>\
      Token Symbol: DPO<br> \
      Total Supply of the token: ' +
    ttlSuply +
    " <br> \
      Portfolio Investment Definition (i.e. amount of the following tokens needed to get 1 DPO token)<br><ol>";
  let portfolioSize = 2;
  for (let i = 0; i < portfolioSize; i++) {
    let tknAddress = await contract.methods.tokensAddr(i).call();
    let tknAmount = await contract.methods.amount(i).call();
    st += "<li><em>" + tknAddress + ": " + tknAmount + "</li><br>";
    console.log(i);
    console.log(tknAddress);
    console.log(tknAmount);
  }
  st += "</ol></p>";
  document.getElementById("maincontent").innerHTML = st;
};

window.showAllProposals = async function () {
  const ttlProposals = await contract.methods.ttlproposals().call();
  let s = "";
  for (let i = 1; i <= parseInt(ttlProposals); i += 1) {
    var prp = await contract.methods.proposals(i).call();
    s +=
      "<strong>ID:</strong>" +
      i +
      "<br> \
    <strong>From Token Address:</strong>" +
      prp.fromToken +
      "<br> \
    <strong>To Token Address:</strong>" +
      prp.toToken +
      "<br> \
    <strong>Percentage:</strong>" +
      prp.perc +
      "<br> \
    <strong>Initiator:</strong>" +
      prp.initiator +
      "<br> \
    <strong>Votes in favour:</strong>" +
      prp.agree +
      "<br> \
    <strong>Votes not in favour:</strong>" +
      prp.disagree +
      '<br> \
    <input type="button" onClick="vote(' +
      i +
      ',true);" class="btn btn-success" value=" Vote in Favour "/> \
    <input type="button" onClick="vote(' +
      i +
      ',false);" class="btn btn-danger" value=" Vote Against "/> \
    <input type="button" onClick="execute(' +
      i +
      ');" class="btn btn-warning" value=" Execute "/><br><br><br>';
  }
  document.getElementById("maincontent").innerHTML = s;
  console.log("Done");
};
