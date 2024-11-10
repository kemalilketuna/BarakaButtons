import axios from "axios";

interface Room {
    roomName: string;
    roomIp: string;
}

class ApiClient {
    private static readonly REQUEST_TIMEOUT = 10000; // 10 seconds

    static getFullIP(ip: string) {
        return `192.168.1.${ip}`;
    }

    static getBaseUrl() {
        const mainIP = localStorage.getItem('mainIP');
        if (!mainIP) {
            throw new Error('Main IP is not set');
        }
        return `http://${this.getFullIP(mainIP)}:8080`;
    }

    static async createRoom(roomName: string, roomIP: string) {
        const mainUrl = `${this.getBaseUrl()}/api/add`;
        const payload = [{
            roomName: roomName,
            roomIp: this.getFullIP(roomIP)
        }];
        const response = await axios.post(mainUrl, payload, {
            timeout: this.REQUEST_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.data;
    }

    static async startRoom(roomName: string, bullets: number) {
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
        try {
            const response = await axios.post(mainUrl, payload, {
                timeout: this.REQUEST_TIMEOUT
            });
            return response.data;
        } catch (error) {
            console.error('Error starting room:', error);
            throw new Error('Failed to start room');
        }
    }

    static async stopRoom(roomName: string, playerId: number) {
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
        const response = await axios.post(mainUrl, payload, {
            timeout: this.REQUEST_TIMEOUT
        });
        return response.data;
    }

    static async increaseBullet(roomName: string, playerId: number, bulletsAmount: number = 20) {
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
        const response = await axios.post(mainUrl, payload, {
            timeout: this.REQUEST_TIMEOUT
        });
        return response.data;
    }

    static async getRooms(): Promise<Room[]> {
        const mainUrl = `${this.getBaseUrl()}/api/rooms`;
        const response = await axios.get(mainUrl, {
            timeout: this.REQUEST_TIMEOUT
        });
        return response.data;
    }
}

export default ApiClient;
