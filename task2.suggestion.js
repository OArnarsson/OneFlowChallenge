const inviteUser = (req, res) => {
	const invitationBody = req.body;
	const {email} = invitationBody;
	const {shopId} = req.params;
	const authUrl = 'https://url.to.auth.system.com/invitation';
	
	superagent
			.post(authUrl)
			.send(invitationBody)
			.end(async (err, invitationResponse) => {
				const {status} = invitationResponse;
				const {authId, invitationId} = invitationResponse.body;
				
				if (status === 200) {
					return res.status(400).json({message: 'User already invited to this shop'});
				} else if (status === 201) {
					const options = {upsert: true, new: true};
					
					try {
						const createdUser = await User.findOneAndUpdate({authId}, {authId, email}, options);
						const shop = await Shop.findById(shopId);
						
						if (!shop) {
							return res.status(404).json({message: 'No shop found'});
						}
						
						const {invitations, users} = shop;
						
						// I think the invitationId inclusion check is unnecessary? see task2.commented.js.
						invitations.push(invitationId);
						
						if (!users.includes(createdUser._id)) {
							users.push(createdUser);
						}
						
						await shop.save();
						
						return res.json(invitationResponse);
					} catch (err) {
						return res.status(500).json({message: 'Error inviting users to this shop'});
					}
				} else {
					return res.status(500).json({message: 'Error inviting user to this shop'});
				}
			});
};

module.exports = {inviteUser};
