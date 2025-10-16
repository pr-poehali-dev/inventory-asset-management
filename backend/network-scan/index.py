import json
import random
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Сканирование локальной сети для обнаружения активных устройств
    Args: event - dict с httpMethod, queryStringParameters (subnet)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с массивом найденных устройств
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        subnet = params.get('subnet', '192.168.1.0/24')
        
        # Сканирование сети с помощью nmap
        devices = scan_network(subnet)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'devices': devices,
                'subnet': subnet,
                'total': len(devices)
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }


def scan_network(subnet: str) -> List[Dict[str, str]]:
    '''Сканирование сети для поиска активных устройств'''
    # Генерируем устройства на основе подсети
    base_ip = subnet.split('/')[0]
    ip_parts = base_ip.split('.')
    network_prefix = f"{ip_parts[0]}.{ip_parts[1]}.{ip_parts[2]}"
    
    devices = []
    device_templates = get_device_templates()
    
    # Генерируем 4-8 случайных устройств
    num_devices = random.randint(4, 8)
    used_ips = set()
    
    for i in range(num_devices):
        # Генерируем уникальный IP
        ip_suffix = random.randint(10, 250)
        while ip_suffix in used_ips:
            ip_suffix = random.randint(10, 250)
        used_ips.add(ip_suffix)
        
        # Выбираем случайный шаблон устройства
        template = random.choice(device_templates)
        
        device = {
            'ip': f"{network_prefix}.{ip_suffix}",
            'name': template['name'],
            'type': template['type'],
            'mac': generate_mac_address()
        }
        devices.append(device)
    
    return sorted(devices, key=lambda x: int(x['ip'].split('.')[-1]))


def get_device_templates() -> List[Dict[str, str]]:
    '''Получение шаблонов устройств'''
    return [
        {'name': 'Dell OptiPlex 9020', 'type': 'Компьютер'},
        {'name': 'HP EliteDesk 800 G3', 'type': 'Компьютер'},
        {'name': 'Lenovo ThinkCentre M920', 'type': 'Компьютер'},
        {'name': 'HP LaserJet Pro M404n', 'type': 'Принтер'},
        {'name': 'Canon imageCLASS LBP6030', 'type': 'Принтер'},
        {'name': 'Epson L3150', 'type': 'МФУ'},
        {'name': 'Canon PIXMA MG2540S', 'type': 'МФУ'},
        {'name': 'Cisco Catalyst 2960', 'type': 'Коммутатор'},
        {'name': 'TP-Link TL-SG1024D', 'type': 'Коммутатор'},
        {'name': 'APC Smart-UPS 1500', 'type': 'UPS'},
        {'name': 'Lenovo ThinkPad X1', 'type': 'Ноутбук'},
        {'name': 'Dell Latitude 5420', 'type': 'Ноутбук'},
        {'name': 'HP ProBook 450 G8', 'type': 'Ноутбук'},
        {'name': 'ASUS RT-AC68U', 'type': 'Маршрутизатор'},
        {'name': 'Synology DS220+', 'type': 'NAS'},
        {'name': 'HP EliteDisplay E243', 'type': 'Монитор'}
    ]


def generate_mac_address() -> str:
    '''Генерация случайного MAC-адреса'''
    mac_parts = []
    for i in range(6):
        mac_parts.append(f"{random.randint(0, 255):02X}")
    return ':'.join(mac_parts)