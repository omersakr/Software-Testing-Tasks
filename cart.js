let items = [];

const addItem = (item) => items.push(item);
const getItems = () => items;
const clearCart = () => { items = []; };

module.exports = { addItem, getItems, clearCart };
