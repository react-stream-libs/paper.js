module('Group');

test('new Group()', function() {
	var doc = new Document();
	var group = new Group();
	equals(doc.activeLayer.children[0] == group, true);
});

test('new Group([item])', function() {
	var doc = new Document();
	var path = new Path();
	var group = new Group([path]);
	equals(doc.activeLayer.children.length == 1, true);
	equals(group.children[0] == path, true);
});

test('Group bounds', function() {
	var doc = new Document();
	doc.currentStyle = {
		strokeWidth: 5,
		strokeColor: 'black'
	};
	var path = new Path.Circle([150, 150], 60);
	var secondPath = new Path.Circle([175, 175], 85);
	var group = new Group([path, secondPath]);
	compareRectangles(group.bounds, { x: 90, y: 90, width: 170, height: 170 });
	compareRectangles(group.strokeBounds, { x: 87.5, y: 87.5, width: 175, height: 175 });
	
	group.rotate(20);
	compareRectangles(group.bounds, { x: 89.97681, y: 82.94095, width: 170.04639, height: 177.08224 });
	compareRectangles(group.strokeBounds, { x: 87.47681, y: 80.44095, width: 175.04639, height: 182.08224 });
	group.rotate(20, new Point(50, 50));
	compareRectangles(group.bounds, { x: 39.70692, y: 114.99196, width: 170.00412, height: 180.22401 });
	compareRectangles(group.strokeBounds, { x: 37.20692, y: 112.49196, width: 175.00412, height: 185.22401 });
});