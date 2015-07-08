var hello = React.createClass({displayName: "hello",
	render: function(){
		return (
			React.createElement("div", null, 
				this.props.name
			)
			);
	}
});
