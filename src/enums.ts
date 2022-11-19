enum VendingError{
    InsufficintFunds="Insufficient funds",
    ProductNotAvailable = "The selected product is not available",
    MaxWidthdrawExceeded = "You can't widthdraw more than the amorunt in the machine",
    InsufficientChange = "The vending machine has Insufficint change to complete the order",
    WrongDenomination = "The denomination input is not valid"
}

export{
    VendingError
}