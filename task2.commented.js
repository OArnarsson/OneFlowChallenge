exports.inviteUser = function (req, res) {
	var invitationBody = req.body;
	var shopId = req.params.shopId;
	var authUrl = "https://url.to.auth.system.com/invitation";
	
	superagent
			.post(authUrl)
			.send(invitationBody)
			.end(function (err, invitationResponse) {
				// Missing if(err) check.
				if (invitationResponse.status === 201) {
					User.findOneAndUpdate({
						authId: invitationResponse.body.authId
					}, {
						authId: invitationResponse.body.authId,
						email: invitationBody.email
					}, {
						upsert: true,
						new: true
					}, function (err, createdUser) {
						// Again, missing if(err) check.
						Shop.findById(shopId).exec(function (err, shop) {
							// A 404 message would be more relevant if no shop is found,
							// 500 error is appropriate when a server error really occurs.
							if (err || !shop) {
								return res.status(500).send(err || {message: 'No  shop  found'});
							}
							
							// The if statement will always return true, checking for === -1 would be in order.
							// Using .includes() reduces risk of error and improves readability.
							// I also think there is no way shop.invitations could include the ID
							// Wasn't invitationResponse.body.invitationId created in the previous request?
							if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
								shop.invitations.push(invitationResponse.body.invitationId);
							}
							
							// I believe this should be shop.users.push(createdUser._id)
							// If we are looking for indexOf(createdUser._id) but add user models, not just _id fields
							// we will never find indexOf(createdUser._id) in the shop.users array, user !== user._id.
							if (shop.users.indexOf(createdUser._id) === -1) {
								shop.users.push(createdUser);
							}
							
							// How can we be sure .save() was successful?
							// We need to move the res.json line to a callback from shop.save()
							shop.save();
						});
					});
				} else if (invitationResponse.status === 200) {
					// Why are we returning an error from a success response?
					// A 412 error would be more appropriate instead of the 200?
					// Now the error message includes a bool, there was none earlier?
					res.status(400).json({
						error: true,
						message: 'User already invited to this shop'
					});
					return;
				}
				// Should be inside a callback function of shop.save() as was stated previously.
				res.json(invitationResponse);
			});
};
