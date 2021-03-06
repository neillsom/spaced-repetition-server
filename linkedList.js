'use strict';
const questions = require('./db/seed/questions');

class _Node {
	constructor(value, next) {
		this.value = value,
		this.next = next;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	insertFirst(item) {
		this.head = new _Node(item, this.head);
	}

	insertLast(item) {
		if (this.head === null) {
			this.insertFirst(item);
		} else {
			let tempNode = this.head;
			while (tempNode.next !== null) {
				tempNode = tempNode.next;
			}
			tempNode.next = new _Node(item, null);
		}
	}
	/**Inserts a new node after a node containing the key.*/
	insertAfter(key, itemToInsert) {
		let tempNode = this.head;
		while (tempNode !== null && tempNode.value !== key) {
			tempNode = tempNode.next;
		}
		if (tempNode !== null) {
			tempNode.next = new _Node(itemToInsert, tempNode.next);
		}
	}
	/* Inserts a new node before a node containing the key.*/
	insertBefore(key, itemToInsert) {
		if (this.head === null) {
			return;
		}
		if (this.head.value === key) {
			this.insertFirst(itemToInsert);
			return;
		}
		let prevNode = null;
		let currNode = this.head;
		while (currNode !== null && currNode.value !== key) {
			prevNode = currNode;
			currNode = currNode.next;
		}
		if (currNode === null) {
			console.log('Node not found to insert');
			return;
		}
		//insert between current and previous
		prevNode.next = new _Node(itemToInsert, currNode);
	}
	insertAt(nthPosition, itemToInsert) {
		if (nthPosition < 0) {
			throw new Error('Position error');
		}
		if (nthPosition === 0) {
			this.insertFirst(itemToInsert);
		} else {
			// Find the node which we want to insert after
			const node = this._findNthElement(nthPosition - 1);
			const newNode = new _Node(itemToInsert, null);
			newNode.next = node.next;
			node.next = newNode;
		}
	}
	_findNthElement(position) {
		let node = this.head;
		for (let i = 0; i < position; i++) {
			node = node.next;
		}
		return node;
	}
	remove(item) {
		//if the list is empty
		if (!this.head) {
			return null;
		}
		//if the node to be removed is head, make the next node head
		if (this.head === item) {
			this.head = this.head.next;
			return;
		}
		//start at the head
		let currNode = this.head;
		//keep track of previous
		let previousNode = this.head;
		while ((currNode !== null) && (currNode.value !== item)) {
			//save the previous node
			previousNode = currNode;
			currNode = currNode.next;
		}
		if (currNode === null) {
			console.log('Item not found');
			return;
		}
		previousNode.next = currNode.next;
	}
	find(item) { //get
		//start at the head
		let currNode = this.head;
		//if the list is empty
		if (!this.head) {
			return null;
		}
		while (currNode.value !== item) {
			//return null if end of the list
			// and the item is not on the list
			if (currNode.next === null) {
				return null;
			} else {
				//keep looking
				currNode = currNode.next;
			}
		}
		//found it
		return currNode;
	}
	removeFirst() {
		return this.head = this.head.next;
	}


	haveMvalue(correct) {
		let currQuestion = this.head;
		if (correct === true) {
			currQuestion.value.Mvalue = currQuestion.value.Mvalue * 2;
		} else {
			currQuestion.value.Mvalue = 1;
		}
		this.removeFirst();
		return this.insertAt(currQuestion.value.Mvalue, currQuestion.value);
	}
}


//helper functions to build lists, insert
function insertAt(mValue, list) {
	//find the nth position (mValue) node is WHERE we want to insert
	let node = list.head;
	for (let i = 0; i < mValue; i++) {
		if (!node.next) {
			break;
		}
		node = node.next;
	}
	//curr nth position next: will point at the insertItem, insertItem next: will point at nth position -1,
	//need to add logic to insertAt if nth position is greater than list length
	const insertItem = list.head;
	list.head = list.head.next;
	insertItem.next = node.next;
	node.next = insertItem;
	return list;
}
//updates position
function updatePosition(list, mValueNew) {
	list.head.value.mValue = mValueNew;
	list.head.value.totalTries++;
	if (mValueNew !== 1) {
		list.head.value.correctTries++;
	}
	return insertAt(mValueNew, list);
}
//builds our list
function buildLinkedList(newList) {
	questions.forEach(plant => {
		plant.totalTries = 0;
		plant.correctTries = 0;
		plant.mValue = 1;
		newList.insertLast(plant);
	});
	return newList;
}

module.exports = { LinkedList: LinkedList, updatePosition, buildLinkedList };