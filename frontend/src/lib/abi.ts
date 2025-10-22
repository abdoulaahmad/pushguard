export const PushGuardABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "newStatus",
        "type": "bool"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "chainNamespace",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "chainId",
        "type": "string"
      }
    ],
    "name": "GuardToggled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "threatType",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "details",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "chainNamespace",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "chainId",
        "type": "string"
      }
    ],
    "name": "ThreatDetected",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "guardActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "chainNamespace",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "chainId",
        "type": "string"
      }
    ],
    "name": "isGuardActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "threatType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "details",
        "type": "string"
      }
    ],
    "name": "reportThreat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "enable",
        "type": "bool"
      }
    ],
    "name": "toggleGuard",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;