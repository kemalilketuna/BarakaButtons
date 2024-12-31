interface Room {
    roomName: string;
    roomIp: string;
}

class ApiClient {
    private static readonly MOCK_ROOMS: Room[] = [
        { roomName: "Room 1", roomIp: "192.168.1.100" },
        { roomName: "Room 2", roomIp: "192.168.1.101" },
    ];
    private static readonly MOCK_DELAY: number = 200;

    static getFullIP(ip: string) {
        return `192.168.1.${ip}`;
    }

    static getBaseUrl() {
        return 'http://mock-api';
    }

    static async createRoom(_roomName: string, _roomIP: string): Promise<any> {
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return { success: true, message: "Room created successfully" };
    }

    static async startGame(_roomName: string, playerId: number, playerName: string, playerSurname: string, bullet: number): Promise<any> {
        console.log(`Starting game for player ${playerName} ${playerSurname} (ID: ${playerId}) with ${bullet} bullets`);
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return {
            responseType: 1,
            message: "Game started successfully",
            status: "active"
        };
    }

    static async startDuello(_roomName: string, player1Name: string, _player1Surname: string, bullet1: number, player2Name: string, _player2Surname: string, bullet2: number): Promise<any> {
        console.log(`Starting duello: ${player1Name} (${bullet1} bullets) vs ${player2Name} (${bullet2} bullets)`);
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return {
            responseType: 1,
            message: "Duello started successfully",
            status: "active"
        };
    }

    static async stopPlayer(_roomName: string, playerId: number): Promise<any> {
        console.log(`Stopping player ${playerId}`);
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return {
            responseType: 1,
            message: "Player stopped successfully"
        };
    }

    static async increaseBullet(_roomName: string, player1Bullet: number, player2Bullet: number): Promise<any> {
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return {
            responseType: 1,
            message: "Bullets increased successfully",
            updatedBullets: [player1Bullet, player2Bullet]
        };
    }

    static async getRooms(): Promise<Room[]> {
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return this.MOCK_ROOMS;
    }

    static async deleteRoom(_roomName: string): Promise<any> {
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return {
            success: true,
            message: "Room deleted successfully"
        };
    }

    static async getRoomStatus(_roomName: string): Promise<number[]> {
        await new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
        return [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
    }
}

console.log('Using Test ApiClient');
export default ApiClient;