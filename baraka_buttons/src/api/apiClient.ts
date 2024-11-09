import axios from "axios";

class ApiClient {

    getBaseUrl() {
        const mainIP = localStorage.getItem('mainIP');
        if (!mainIP) {
            throw new Error('Main IP is not set');
        }
        return `192.168.1.${mainIP}:8080`;
    }

    async createRoom(roomName: string, roomIP: string) {
        const mainUrl = `${this.getBaseUrl()}/api/add`;
        const payload = {
            roomName: roomName,
            roomIP: roomIP
        }
        const response = await axios.post(mainUrl, payload);
        return response.data;
    }

    async startRoom(roomName: string, bullets: number) {
        const mainUrl = `${this.getBaseUrl()}/api/route`;
        const payload = {
            roomName: roomName,
            body: {
                command: 0,
                payload: {
                    players: [
                        {
                            id: 0,
                            name: "player0",
                            surname: "player0",
                            bullet: bullets
                        }, {
                            id: 1,
                            name: "player1",
                            surname: "player1",
                            bullet: bullets
                        }
                    ],
                    game: 1
                }
            }
        }
        const response = await axios.post(mainUrl, payload);
        return response.data;
    }

    async stopRoom(roomName: string, playerId: number) {
        const mainUrl = `${this.getBaseUrl()}/api/route`;
        const payload = {
            roomName: roomName,
            body: {
                command: 1,
                payload: {
                    players: [{ id: playerId, name: null, surname: null, bullet: null }],
                    game: null
                }
            }
        }
        const response = await axios.post(mainUrl, payload);
        return response.data;
    }

    async increaseBullet(roomName: string, playerId: number, bulletsAmount: number = 20) {
        const mainUrl = `${this.getBaseUrl()}/api/route`;
        const payload = {
            roomName: roomName,
            body: {
                command: 2,
                payload: {
                    players: [{ id: playerId, name: null, surname: null, bullet: bulletsAmount }],
                    game: null
                }
            }
        }
        const response = await axios.post(mainUrl, payload);
        return response.data;
    }
}

export default ApiClient;
