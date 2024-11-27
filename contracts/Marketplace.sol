// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

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

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Product name is required");
        require(_price > 0, "Price must be greater than zero");

        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            payable(msg.sender),
            address(0)
        );

        emit ProductCreated(
            productCount,
            _name,
            _price,
            msg.sender,
            address(0)
        );
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        address payable _seller = _product.seller;

        require(_product.id > 0 && _product.id <= productCount, "Invalid product ID");
        require(msg.value >= _product.price, "Insufficient Ether");
        require(_product.buyer == address(0), "Product already sold");
        require(_seller != msg.sender, "Seller cannot buy their own product");

        _product.buyer = msg.sender;
        products[_id] = _product;

        _seller.transfer(msg.value);

        emit ProductPurchased(
            _product.id,
            _product.name,
            _product.price,
            _seller,
            msg.sender
        );
    }
}
