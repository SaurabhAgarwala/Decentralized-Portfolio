from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import forms

import json
from web3 import Web3

# Create your views here.
w3 = Web3(Web3.HTTPProvider("https://kovan.infura.io/v3/9f32de0d04ea4414aa512f9415d6760f"))

abi = json.loads('[{"inputs":[{"internalType":"address[]","name":"tkns","type":"address[]"},{"internalType":"uint256[]","name":"amnt","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"amount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"executeProposal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"unit","type":"uint256"}],"name":"issue","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"address","name":"fromToken","type":"address"},{"internalType":"address","name":"toToken","type":"address"},{"internalType":"uint256","name":"perc","type":"uint256"},{"internalType":"address","name":"initiator","type":"address"},{"internalType":"uint256","name":"agree","type":"uint256"},{"internalType":"uint256","name":"disagree","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"fToken","type":"address"},{"internalType":"address","name":"tToken","type":"address"},{"internalType":"uint256","name":"per","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"propose","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokensAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ttlproposals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"},{"internalType":"bool","name":"vote","type":"bool"}],"name":"voteForProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"unit","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]')
address = w3.toChecksumAddress("0x679117185db0eb6c63a37d9e57da4d936805e77a")

public_key = "0x22946356417E7bC5644BF9fa327B9110b30662fa"
private_key = "232a904ba1407fb442a905f7b5edc6224dd8bccf47639421fe3e416bfcb92007"

contract = w3.eth.contract(address=address, abi=abi)

def home(request):
    return render(request, 'smartcontract/home.html')

def ttlProposals(request):
    ttlProposals = contract.functions.ttlproposals().call()
    return ttlProposals

def approve(request):
    nonce = w3.eth.getTransactionCount(public_key)
    tx_receipt = 'not yet got'
    tx = contract.functions.approve().buildTransaction({
        'chainId': 42,
        'gas': 10000000,
        'gasPrice': w3.toWei('40','gwei'),
        'nonce': nonce,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    print(tx_receipt)

def issue(request):
    if request.method == "GET":
        form = forms.IssueWithdrawForm()
        return render(request, 'smartcontract/issue.html', {'form':form})
    elif request.method == "POST":
        form = forms.IssueWithdrawForm(request.POST)
        if form.is_valid():
            nonce = w3.eth.getTransactionCount(public_key)
            tx = contract.functions.issue(int(form.cleaned_data["qty"]*10**18)).buildTransaction({
                'chainId': 42,
                'gas': 10000000,
                'gasPrice': w3.toWei('40','gwei'),
                'nonce': nonce,
            })
            signed_tx = w3.eth.account.sign_transaction(tx, private_key)
            tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
            w3.eth.waitForTransactionReceipt(tx_hash)
            return render(request, 'smartcontract/result.html',{'tx_hash':tx_hash.hex()})


def withdraw(request):
    if request.method == "GET":
        form = forms.IssueWithdrawForm()
        return render(request, 'smartcontract/withdraw.html', {'form':form})
    elif request.method == "POST":
        form = forms.IssueWithdrawForm(request.POST)
        if form.is_valid():
            nonce = w3.eth.getTransactionCount(public_key)
            tx = contract.functions.withdraw(int(form.cleaned_data["qty"]*10**18)).buildTransaction({
                'chainId': 42,
                'gas': 10000000,
                'gasPrice': w3.toWei('40','gwei'),
                'nonce': nonce,
            })
            signed_tx = w3.eth.account.sign_transaction(tx, private_key)
            tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
            w3.eth.waitForTransactionReceipt(tx_hash)
            return render(request, 'smartcontract/result.html',{'tx_hash':tx_hash.hex()})

def propose(request):
    if request.method == "GET":
        form = forms.ProposalForm()
        return render(request, 'smartcontract/propose.html', {'form':form})
    elif request.method == "POST":
        form = forms.ProposalForm(request.POST)
        if form.is_valid():
            nonce = w3.eth.getTransactionCount(public_key)
            tx = contract.functions.propose(w3.toChecksumAddress(form.cleaned_data["from_token"]),w3.toChecksumAddress(form.cleaned_data["to_token"]),form.cleaned_data["percentage"],300).buildTransaction({
                'chainId': 42,
                'gas': 10000000,
                'gasPrice': w3.toWei('40','gwei'),
                'nonce': nonce,
            })
            signed_tx = w3.eth.account.sign_transaction(tx, private_key)
            tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
            w3.eth.waitForTransactionReceipt(tx_hash)
            return render(request, 'smartcontract/result.html',{'tx_hash':tx_hash.hex()})

def proposals(request):
    proposal_count = ttlProposals(request)
    proposals = []
    for i in range(proposal_count):
        ppsl = contract.functions.proposals(i+1).call()
        proposal = {
            'id': i+1,
            'from':ppsl[0],
            'to':ppsl[1],
            'perc':ppsl[2],
            'initiator':ppsl[3],
            'agree':ppsl[4],
            'disagree':ppsl[5]
        }
        proposals.insert(0,proposal)
    return render(request, 'smartcontract/proposals.html',{'proposals':proposals})

    proposal = contract.functions.proposals(5).call() # Params: Starting from 1
    print(proposal)

def amount(request):
    amount = contract.functions.amount(1).call() # Params: 0,1
    print(amount)

def totalSupply(request):
    totalSupply = contract.functions.totalSupply().call()
    print(totalSupply)

def agree(request,id):
    nonce = w3.eth.getTransactionCount(public_key)
    tx = contract.functions.voteForProposal(int(id),True).buildTransaction({
        'chainId': 42,
        'gas': 10000000,
        'gasPrice': w3.toWei('40','gwei'),
        'nonce': nonce,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    w3.eth.waitForTransactionReceipt(tx_hash)
    return render(request, 'smartcontract/result.html',{'tx_hash':tx_hash.hex()})

def disagree(request,id):
    nonce = w3.eth.getTransactionCount(public_key)
    tx = contract.functions.voteForProposal(int(id),False).buildTransaction({
        'chainId': 42,
        'gas': 10000000,
        'gasPrice': w3.toWei('40','gwei'),
        'nonce': nonce,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    w3.eth.waitForTransactionReceipt(tx_hash)
    return render(request, 'smartcontract/result.html',{'tx_hash':tx_hash.hex()})

def executeProposal(request,id):
    nonce = w3.eth.getTransactionCount(public_key)
    tx = contract.functions.executeProposal(int(id)).buildTransaction({
        'chainId': 42,
        'gas': 10000000,
        'gasPrice': w3.toWei('40','gwei'),
        'nonce': nonce,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    w3.eth.waitForTransactionReceipt(tx_hash)
    return render(request, 'smartcontract/result.html',{'tx_hash':tx_hash.hex()})
