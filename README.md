## Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

# Assignment 3 - Part 2: Smart Contract Testing with Hardhat

### **Blockchain Technologies 1**

### **Overview**
This project extends Assignment 3, Part 1 by implementing test cases for the ERC-20 token smart contract. The tasks include writing tests using Hardhat, modifying the contract's constructor, and ensuring comprehensive test coverage.

### **Project Structure**
```
📂 Blockchain1Assignment3-2
├── 📂 contracts
│   ├── MyToken.sol          # ERC-20 Token contract (modified version)
├── 📂 test
│   ├── MyToken.test.js      # Hardhat test cases for the smart contract
├── 📂 ignition/modules
│   ├── deployment.js        # Deployment script for Hardhat
├── 📂 screenshots
│   ├── test_results.png     # Screenshots of successful test execution
├── .gitignore               # Git ignore file
├── hardhat.config.js        # Hardhat configuration file
├── package.json             # Dependencies and scripts
├── package-lock.json        # Lock file for npm dependencies
└── README.md                # Documentation (this file)
```

### **Tasks & Implementation**

#### **1. Test Cases for Initial Smart Contract**
- Developed test cases using **Hardhat** to verify all functions in `MyToken.sol` from Assignment 3, Part 1.
- Ensured that:
  - Token supply is correctly set.
  - Transaction details (timestamp, sender, receiver) are retrievable.
  - Basic ERC-20 functions (`transfer`, `approve`, `balanceOf`, etc.) work as expected.

#### **2. Modifications to Smart Contract**
- Modified the **constructor** to accept an input parameter (e.g., an initial value or owner address).
- Integrated the parameter meaningfully (e.g., setting an initial state variable).
- Updated the contract logic to accommodate the change.

#### **3. Test Cases for Modified Smart Contract**
- Implemented additional tests to validate the modified constructor.
- Ensured that the new constructor parameter is correctly utilized.


### **Installation & Setup**
#### **1. Clone the Repository**
```sh
git clone https://github.com/diaszakir/Blockchain1Assignment3-2.git
cd Blockchain1Assignment3-2
```

#### **2. Install Dependencies**
```sh
npm install
```

#### **3. Run Test Cases**
```sh
npx hardhat test
```

## Screenchot
![image](https://github.com/user-attachments/assets/efba7a33-5bc0-4043-a527-67c11159dee1)


### **References**
- [Hardhat Tutorial](https://hardhat.org/tutorial)
- [Hardhat Testing Guide](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)
- [OpenZeppelin ERC-20 Implementation](https://wizard.openzeppelin.com/)

### **Authors & Contributors**
- **Danel Kanbakova / SE-2320**
- **Dias Zakir / SE-2320**
- **Anvar Tamabayev / SE-2320**
- **Astana IT University**



