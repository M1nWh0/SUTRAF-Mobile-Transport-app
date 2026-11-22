import { subscriptions, tickets, users } from '$lib/data/index.js';

/**
 * Passenger Services for Passes, Tickets & Profile
 */

export function getPassengerSubscriptions(passengerId = 'user-passenger-1') {
	return subscriptions.filter((s) => s.passengerId === passengerId);
}

export function getPassengerTickets(passengerId = 'user-passenger-1') {
	return tickets.filter((t) => t.passengerId === passengerId);
}

export function getDemoUser(userId = 'user-passenger-1') {
	return users.find((u) => u.id === userId) || null;
}

export function getAllDemoUsers() {
	return users;
}
