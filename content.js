function removeMessages(scope) {
	const node = scope || document.body;

	const iterator = document.evaluate(
		"//text()[contains(translate(., 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'), 'сообщение (материал) создано и (или)')]",
		document,
		null,
		XPathResult.ANY_TYPE,
		null
	);

	try {
		while ((thisNode = iterator.iterateNext())) {
			if (thisNode.hasChildNodes()) continue;

			thisNode.remove();
		}
	} catch (e) {}
}

const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			removeMessages(addedNode);
		}
	}
});

observer.observe(document, { childList: true, subtree: true });

removeMessages();
