var HelloComponent = React.createClass({displayName: "HelloComponent",
	render: function(){
		return (
			React.createElement("div", null, 
				this.props.name
			)
			);
	}
});
