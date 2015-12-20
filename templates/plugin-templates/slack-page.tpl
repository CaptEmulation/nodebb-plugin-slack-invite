<h3>Click on the button below to get in invite to slack for {email}</h3>
<div className="content">
	<div className="information">
		<button id="join" className="btn btn-primary">
			Join
		</button>
	</div>
</div>

<script>
	$('button#join').click(function (event) {
		event.preventDefault();
		console.log('slack.invite');
		socket.emit('plugins.foo');
		socket.emit('plugins.slack.invite');
	});
</script>