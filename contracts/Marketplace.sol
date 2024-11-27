// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Marketplace {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
        address buyer;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address seller,
        address buyer
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address seller,
        address buyer
    );

    function createProduct(string memory name, uint price) public {
        require(bytes(name).length > 0, "Product name is required");
        require(price > 0, "Price must be greater than zero");

        productCount++;
        products[productCount] = Product(
            productCount,
            name,
            price,
            payable(msg.sender),
            address(0)
        );

        emit ProductCreated(
            productCount,
            name,
            price,
            msg.sender,
            address(0)
        );
    }

    function purchaseProduct(uint id) public payable {
        Product storage product = products[id];
        address payable seller = product.seller;

        require(product.id > 0 && product.id <= productCount, "Invalid product ID");
        require(msg.value >= product.price, "Insufficient Ether");
        require(product.buyer == address(0), "Product already sold");
        require(seller != msg.sender, "Seller cannot buy their own product");

        // Update state first
        product.buyer = msg.sender;

        // Emit event before external interaction
        emit ProductPurchased(
            product.id,
            product.name,
            product.price,
            seller,
            msg.sender
        );

    // External interaction (transfer Ether)
    seller.transfer(msg.value);
    }
}
