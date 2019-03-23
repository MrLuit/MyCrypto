pragma solidity 0.5.6;

interface ERC20 {
    function balanceOf(address) external view returns(uint256);
}

contract TokenScanner {
    function scanTokens(address _owner, address[] memory _contracts) public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](_contracts.length);
        for(uint i = 0; i < _contracts.length; i++) {
            ERC20 Contract = ERC20(_contracts[i]);
            balances[i] = Contract.balanceOf(_owner);
        }
        return balances;
    }
}