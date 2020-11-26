import { Button, Grid, List, ListItem, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import Message from '../Components/Message';

const PlaceOrder = () => {
	const [ sdkReady, setSdkReady ] = useState(false);
	const [ add1, setAdd1 ] = useState();
	const [ add2, setAdd2 ] = useState();
	const [ city, setCity ] = useState();
	const [ houseNo, setHouseNo ] = useState();
	const [ paid, setPaid ] = useState(false);

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		const addPaypalScript = () => {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src =
				'https://www.paypal.com/sdk/js?client-id=AZeYfzbKeuhspqxoN29JLc1LNHmsmSuyinOhr4_KWZS-TdxWTFt_auDT9ckzEChVr7i6WKhOD8uPYnzT';
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		addPaypalScript();
	}, []);

	const successPaymentHandler = (paymentResult) => {
		if (paymentResult) {
			setPaid(true);
		}
	};
	console.log(sdkReady);

	return (
		<div>
			<Button variant='outlined' disableElevation style={{ marginTop: 20 }}>
				<Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
					Back to Cart
				</Link>
			</Button>
			{paid ? (
				<div>
					<Message severity='success' style={{ marginTop: 10 }}>
						Successfully Paid. Your ordered items will be delivered to {add1}, {add2}, {city}, House No.
						{houseNo}
					</Message>
					<Message severity='success'>
						Your Paypal Account was charged Rs.{' '}
						{cartItems
							.reduce(
								(acc, item) => Number(acc + item.qty * item.price * 0.13 + item.qty * item.price),
								0
							)
							.toFixed(2)}
					</Message>
				</div>
			) : null}
			<Grid container>
				<Grid item xs={12} md={8}>
					<h2>Shipping Address</h2>
					<p>
						To: {userInfo.fullName}, Phone: {userInfo.phone}
					</p>
					<TextField
						style={{ margin: 10 }}
						id='filled-basic'
						label='Address 1, Street'
						variant='filled'
						value={add1}
						onChange={(event) => setAdd1(event.target.value)}
					/>
					<TextField
						style={{ margin: 10 }}
						id='filled-basic'
						label='Address 2, Line'
						variant='filled'
						value={add2}
						onChange={(event) => setAdd2(event.target.value)}
					/>
					<TextField
						style={{ margin: 10 }}
						id='filled-basic'
						label='City'
						variant='filled'
						value={city}
						onChange={(event) => setCity(event.target.value)}
					/>
					<TextField
						style={{ margin: 10 }}
						id='filled-basic'
						label='House Number'
						variant='filled'
						value={houseNo}
						onChange={(event) => setHouseNo(event.target.value)}
					/>

					<h2>Cart Items</h2>
					<div style={{ marginTop: -50 }}>
						<List>
							<ListItem>
								<Grid container>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										<h3>Product</h3>
									</Grid>
									<Grid item md={4} style={{ textAlign: 'center' }}>
										<h3>Product Name</h3>
									</Grid>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										<h3>Price</h3>
									</Grid>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										<h3>Quantity</h3>
									</Grid>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										<h3>Total</h3>
									</Grid>
								</Grid>
							</ListItem>
						</List>
						<List>
							{cartItems.map((item) => (
								<ListItem key={item.product}>
									<Grid container>
										<Grid item md={2} style={{ textAlign: 'center' }}>
											<img
												src={`data:image/jpeg;base64,${item.image}`}
												alt={item.product}
												style={{ height: 50, width: 'auto' }}
											/>
										</Grid>
										<Grid item md={4} style={{ textAlign: 'center' }}>
											{item.name}
										</Grid>
										<Grid item md={2} style={{ textAlign: 'center' }}>
											Rs. {item.price}
										</Grid>
										<Grid item md={2} style={{ textAlign: 'center' }}>
											{item.qty}
										</Grid>
										<Grid item md={2} style={{ textAlign: 'center' }}>
											Rs. {Number(item.qty * item.price)}
										</Grid>
									</Grid>
								</ListItem>
							))}
						</List>
					</div>
				</Grid>
				<Grid item md={4} style={{ marginTop: 50, textAlign: 'right' }}>
					<h1>Order Summary</h1>
					<List style={{ marginTop: -50 }}>
						<ListItem style={{ display: 'block' }}>
							<h3 style={{ textAlign: 'right' }}>
								Total items: {cartItems.reduce((acc, item) => Number(acc + item.qty), 0)}{' '}
							</h3>
							<h3 style={{ textAlign: 'right' }}>
								Subtotal: Rs.{' '}
								{cartItems.reduce((acc, item) => Number(acc + item.qty * item.price), 0).toFixed(2)}
							</h3>
							<h3 style={{ textAlign: 'right' }}>
								Tax: Rs.{' '}
								{cartItems
									.reduce((acc, item) => Number(acc + item.qty * item.price * 0.13), 0)
									.toFixed(2)}{' '}
							</h3>
							<h3 style={{ textAlign: 'right' }}>
								Total Price: Rs. {' '}
								{cartItems
									.reduce(
										(acc, item) =>
											Number(acc + item.qty * item.price * 0.13 + item.qty * item.price),
										0
									)
									.toFixed(2)}
							</h3>
						</ListItem>
						<ListItem style={{ display: 'flex', justifyContent: 'flex-end' }}>
							{paid ? null : (
								<PayPalButton
									amount={
										cartItems
											.reduce(
												(acc, item) =>
													Number(acc + item.qty * item.price * 0.13 + item.qty * item.price),
												0
											)
											.toFixed(2) / 100
									}
									onSuccess={successPaymentHandler}
								/>
							)}
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</div>
	);
};

export default PlaceOrder;
