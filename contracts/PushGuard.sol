// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// Universal Account ID Struct and IUEAFactory Interface
struct UniversalAccountId {
    string chainNamespace;
    string chainId;
    bytes owner;
}

interface IUEAFactory {
    function getOriginForUEA(address addr) external view returns (UniversalAccountId memory account, bool isUEA);
}

contract PushGuard {
    // Per-chain guard status
    mapping(bytes => bool) public guardActive;
    
    // Constants for UEA Factory
    address constant UEA_FACTORY = 0x00000000000000000000000000000000000000eA;
    
    // Events
    event GuardToggled(
        bool newStatus,
        address indexed caller,
        string chainNamespace,
        string chainId
    );
    
    event ThreatDetected(
        address indexed caller,
        string threatType,
        string details,
        string chainNamespace,
        string chainId
    );
    
    constructor() {}
    
    /**
     * @dev Enable or disable protection for the caller based on their origin chain
     * @param enable Whether to enable or disable protection
     */
    function toggleGuard(bool enable) public {
        address caller = msg.sender;
        
        // Get the origin chain information for the caller
        (UniversalAccountId memory origin, bool isUEA) = IUEAFactory(UEA_FACTORY).getOriginForUEA(caller);
        
        // If this is not a UEA, use the caller's address as the origin
        if (!isUEA) {
            // For native Push Chain accounts, we use push:9000 as the chain
            bytes memory chainHash = abi.encodePacked("push", ":", "9000");
            guardActive[chainHash] = enable;
            emit GuardToggled(enable, caller, "push", "9000");
        } else {
            // For UEAs, use the origin chain information
            bytes memory chainHash = abi.encodePacked(origin.chainNamespace, ":", origin.chainId);
            guardActive[chainHash] = enable;
            emit GuardToggled(enable, caller, origin.chainNamespace, origin.chainId);
        }
    }
    
    /**
     * @dev Check if guard is active for a specific chain
     * @param chainNamespace The chain namespace (e.g., "eip155", "solana")
     * @param chainId The chain ID (e.g., "11155111", "EtWTRABZaYq6iMfeYKouRu166VU2xqa1")
     * @return Whether the guard is active for this chain
     */
    function isGuardActive(string calldata chainNamespace, string calldata chainId) public view returns (bool) {
        bytes memory chainHash = abi.encodePacked(chainNamespace, ":", chainId);
        return guardActive[chainHash];
    }
    
    /**
     * @dev Report a potential threat
     * @param threatType Type of threat detected
     * @param details Additional details about the threat
     */
    function reportThreat(string calldata threatType, string calldata details) public {
        address caller = msg.sender;
        
        // Get the origin chain information for the caller
        (UniversalAccountId memory origin, bool isUEA) = IUEAFactory(UEA_FACTORY).getOriginForUEA(caller);
        
        // If this is not a UEA, use the caller's address as the origin
        if (!isUEA) {
            // For native Push Chain accounts, we use push:9000 as the chain
            emit ThreatDetected(caller, threatType, details, "push", "9000");
        } else {
            // For UEAs, use the origin chain information
            emit ThreatDetected(caller, threatType, details, origin.chainNamespace, origin.chainId);
        }
    }
}