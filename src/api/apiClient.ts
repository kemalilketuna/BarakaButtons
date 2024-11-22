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

    static async startGame(roomName: string, playerId: number, playerName: string, playerSurname: string, bullet: number) {
        const mainUrl = `${this.getBaseUrl()}/api/route`;
        const payload = {
            roomName: roomName,
            body: {
                command: 0,
                payload: {
                    players: [{ id: playerId, name: playerName, surname: playerSurname, bullet: bullet }],
                    game: 0
                }
            }
        }
        const response = await axios.post(mainUrl, payload, {
            timeout: this.REQUEST_TIMEOUT
        });
        if (response.data.responseType === 4) {
            throw new Error('Cannot start new game');
        }
        return response.data;
    }

    static async startDuello(roomName: string, player1Name: string, player1Surname: string, bullet1: number, player2Name: string, player2Surname: string, bullet2: number) {
        const mainUrl = `${this.getBaseUrl()}/api/route`;
        const payload = {
            roomName: roomName,
            body: {
                command: 0,
                payload: {
                    players: [
                        {
                            id: 0,
                            name: player1Name,
                            surname: player1Surname,
                            bullet: bullet1
                        }, {
                            id: 1,
                            name: player2Name,
                            surname: player2Surname,
                            bullet: bullet2
                        }
                    ],
                    game: 1
                }
            }
        }
        const response = await axios.post(mainUrl, payload, {
            timeout: this.REQUEST_TIMEOUT
        });
        if (response.data.responseType === 4) {
            throw new Error('Cannot start a duellos');
        }
        return response.data;
    }

    static async stopPlayer(roomName: string, playerId: number) {
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
        if (response.data.responseType === 4) {
            throw new Error('Failed to stop game');
        }
        return response.data;
    }

    static async increaseBullet(roomName: string, player1Bullet: number, player2Bullet: number) {
        const mainUrl = `${this.getBaseUrl()}/api/route`;
        const payload = {
            roomName: roomName,
            body: {
                command: 2,
                payload: {
                    players: [
                        { id: 0, name: null, surname: null, bullet: player1Bullet },
                        { id: 1, name: null, surname: null, bullet: player2Bullet }
                    ],
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

    static async deleteRoom(roomName: string) {
        const mainUrl = `${this.getBaseUrl()}/api/remove`;
        const payload = { roomName: roomName };
        const response = await axios.post(mainUrl, payload, {
            timeout: this.REQUEST_TIMEOUT
        });
        return response.data;
    }

    static async getRoomStatus(roomName: string): Promise<number[]> {
        const mainUrl = `${this.getBaseUrl()}/api/route`;
        const payload = { roomName: roomName, body: { command: 3, payload: {} } };
        const response = await axios.post(mainUrl, payload, {
            timeout: this.REQUEST_TIMEOUT
        });
        return response.data.bulletCount;
    }
}

export default ApiClient;
