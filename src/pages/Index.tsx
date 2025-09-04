import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    type: '',
    department: '',
    building: '',
    status: '',
    serialNumber: '',
    inventoryNumber: '',
    specifications: '',
    description: ''
  });

  // Статистика для дашборда
  const stats = [
    { title: 'Всего оборудования', value: '1,247', icon: 'Monitor', change: '+12%' },
    { title: 'Компьютеры', value: '485', icon: 'Laptop', change: '+5%' },
    { title: 'Принтеры и МФУ', value: '128', icon: 'Printer', change: '+8%' },
    { title: 'Периферия', value: '634', icon: 'Mouse', change: '+15%' }
  ];

  // Данные зданий
  const buildings = [
    { id: 1, name: 'Главный офис', address: 'ул. Ленина, 15', departments: 8, equipment: 542 },
    { id: 2, name: 'Филиал №1', address: 'ул. Советская, 32', departments: 5, equipment: 298 },
    { id: 3, name: 'Склад', address: 'ул. Промышленная, 7', departments: 3, equipment: 156 },
    { id: 4, name: 'Филиал №2', address: 'ул. Мира, 44', departments: 6, equipment: 251 }
  ];

  // Данные отделов
  const departments = [
    { id: 1, name: 'Бухгалтерия', building: 'Главный офис', employees: 15, computers: 15, equipment: 45 },
    { id: 2, name: 'Отдел продаж', building: 'Главный офис', employees: 22, computers: 22, equipment: 68 },
    { id: 3, name: 'IT отдел', building: 'Главный офис', employees: 8, computers: 12, equipment: 85 },
    { id: 4, name: 'Маркетинг', building: 'Филиал №1', employees: 12, computers: 12, equipment: 38 },
    { id: 5, name: 'Администрация', building: 'Главный офис', employees: 6, computers: 6, equipment: 28 }
  ];

  // Данные оборудования
  const [equipmentData, setEquipmentData] = useState([
    { 
      id: 1, 
      name: 'Dell OptiPlex 7090', 
      type: 'Компьютер', 
      department: 'Бухгалтерия', 
      building: 'Главный офис', 
      status: 'Работает', 
      serialNumber: 'DO7090-001',
      inventoryNumber: 'ИНВ-001',
      specifications: 'Intel Core i7, 16GB RAM, 512GB SSD',
      description: 'Настольный компьютер для работы с документами'
    },
    { 
      id: 2, 
      name: 'HP LaserJet Pro M404n', 
      type: 'Принтер', 
      department: 'Отдел продаж', 
      building: 'Главный офис', 
      status: 'Работает', 
      serialNumber: 'HP404-002',
      inventoryNumber: 'ИНВ-002',
      specifications: 'Черно-белый лазерный, 38 стр/мин, Ethernet',
      description: 'Принтер для печати договоров и документов'
    },
    { 
      id: 3, 
      name: 'Canon imageCLASS MF445dw', 
      type: 'МФУ', 
      department: 'Бухгалтерия', 
      building: 'Главный офис', 
      status: 'На ремонте', 
      serialNumber: 'CN445-003',
      inventoryNumber: 'ИНВ-003',
      specifications: 'МФУ ч/б, печать/сканер/копир, Wi-Fi',
      description: 'Многофункциональное устройство, требует ремонт'
    },
    { 
      id: 4, 
      name: 'Logitech MX Master 3', 
      type: 'Мышь', 
      department: 'IT отдел', 
      building: 'Главный офис', 
      status: 'Работает', 
      serialNumber: 'LG-MX3-004',
      inventoryNumber: 'ИНВ-004',
      specifications: 'Беспроводная, 4000 DPI, USB-C зарядка',
      description: 'Эргономичная мышь для дизайнеров'
    },
    { 
      id: 5, 
      name: 'Dell UltraSharp U2720Q', 
      type: 'Монитор', 
      department: 'Маркетинг', 
      building: 'Филиал №1', 
      status: 'Работает', 
      serialNumber: 'DU272-005',
      inventoryNumber: 'ИНВ-005',
      specifications: '27" 4K IPS, USB-C, регулировка по высоте',
      description: '4K монитор для работы с графикой'
    },
    { 
      id: 6, 
      name: 'Lenovo ThinkPad T14', 
      type: 'Ноутбук', 
      department: 'Администрация', 
      building: 'Филиал №2', 
      status: 'Работает', 
      serialNumber: 'LT14-006',
      inventoryNumber: 'ИНВ-006',
      specifications: 'Intel Core i5, 8GB RAM, 256GB SSD, 14"',
      description: 'Рабочий ноутбук для выездной работы'
    },
    { 
      id: 7, 
      name: 'Epson WorkForce Pro WF-4830', 
      type: 'МФУ', 
      department: 'Маркетинг', 
      building: 'Филиал №1', 
      status: 'Работает', 
      serialNumber: 'EP4830-007',
      inventoryNumber: 'ИНВ-007',
      specifications: 'Цветной струйный МФУ, A4, Wi-Fi, двусторонняя печать',
      description: 'МФУ для печати маркетинговых материалов'
    },
    { 
      id: 8, 
      name: 'ASUS ROG Monitor 27"', 
      type: 'Монитор', 
      department: 'IT отдел', 
      building: 'Главный офис', 
      status: 'Работает', 
      serialNumber: 'ASUS27-008',
      inventoryNumber: 'ИНВ-008',
      specifications: '27" Gaming, 144Hz, 1ms, G-Sync',
      description: 'Игровой монитор для тестирования ПО'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Работает': 'bg-green-100 text-green-800',
      'На ремонте': 'bg-yellow-100 text-yellow-800',
      'Списан': 'bg-red-100 text-red-800',
      'Новый': 'bg-blue-100 text-blue-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const handleEditEquipment = (equipment: any) => {
    setEditingEquipment(equipment);
    setEditForm({
      name: equipment.name,
      type: equipment.type,
      department: equipment.department,
      building: equipment.building,
      status: equipment.status,
      serialNumber: equipment.serialNumber,
      inventoryNumber: equipment.inventoryNumber,
      specifications: equipment.specifications,
      description: equipment.description
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEquipment = () => {
    if (editingEquipment) {
      setEquipmentData(prev => prev.map(item => 
        item.id === editingEquipment.id 
          ? { ...item, ...editForm }
          : item
      ));
      setIsEditDialogOpen(false);
      setEditingEquipment(null);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Icon name="Package" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Инвентаризация</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name={stat.icon} size={24} className="text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Фильтры */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Поиск оборудования..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите здание" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.name}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите отдел" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Основной контент в табах */}
        <Tabs defaultValue="equipment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="equipment">Оборудование</TabsTrigger>
            <TabsTrigger value="buildings">Здания</TabsTrigger>
            <TabsTrigger value="departments">Отделы</TabsTrigger>
            <TabsTrigger value="computers">Компьютеры</TabsTrigger>
            <TabsTrigger value="printers">Принтеры</TabsTrigger>
            <TabsTrigger value="reports">Отчеты</TabsTrigger>
          </TabsList>

          {/* Каталог оборудования */}
          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Package" size={20} className="mr-2" />
                  Каталог оборудования
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Наименование</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Здание</TableHead>
                      <TableHead>Отдел</TableHead>
                      <TableHead>Серийный номер</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipmentData
                      .filter(item => 
                        (!selectedBuilding || item.building === selectedBuilding) &&
                        (!selectedDepartment || item.department === selectedDepartment) &&
                        (!searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
                      )
                      .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell className="text-sm text-gray-600">{item.building}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell className="font-mono text-sm">{item.serialNumber}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditEquipment(item)}
                            >
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Здания */}
          <TabsContent value="buildings">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildings.map((building) => (
                <Card key={building.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon name="Building" size={20} className="mr-2" />
                      {building.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{building.address}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Отделов:</span>
                        <span className="font-semibold">{building.departments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Оборудования:</span>
                        <span className="font-semibold">{building.equipment}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Отделы */}
          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Users" size={20} className="mr-2" />
                  Отделы организации
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название отдела</TableHead>
                      <TableHead>Здание</TableHead>
                      <TableHead>Сотрудники</TableHead>
                      <TableHead>Компьютеры</TableHead>
                      <TableHead>Всего оборудования</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>{dept.building}</TableCell>
                        <TableCell>{dept.employees}</TableCell>
                        <TableCell>{dept.computers}</TableCell>
                        <TableCell>{dept.equipment}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Компьютеры */}
          <TabsContent value="computers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Laptop" size={20} className="mr-2" />
                  Компьютерное оборудование
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {equipmentData.filter(item => item.type === 'Компьютер').map((computer) => (
                    <Card key={computer.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Icon name="Monitor" size={24} className="text-primary" />
                          <Badge className={getStatusBadge(computer.status)}>
                            {computer.status}
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{computer.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{computer.department}</p>
                        <p className="text-xs font-mono text-gray-500">{computer.serialNumber}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Принтеры и МФУ */}
          <TabsContent value="printers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Printer" size={20} className="mr-2" />
                  Принтеры и МФУ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {equipmentData.filter(item => item.type === 'Принтер' || item.type === 'МФУ').map((printer) => (
                    <Card key={printer.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Icon name="Printer" size={24} className="text-primary" />
                          <Badge className={getStatusBadge(printer.status)}>
                            {printer.status}
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{printer.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{printer.department}</p>
                        <p className="text-xs font-mono text-gray-500">{printer.serialNumber}</p>
                        <p className="text-xs text-primary mt-2">{printer.type}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Отчеты */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="BarChart3" size={20} className="mr-2" />
                    Статистика по типам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Компьютеры</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-sm font-medium">485</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Периферия</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium">634</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Принтеры/МФУ</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-sm font-medium">128</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="TrendingUp" size={20} className="mr-2" />
                    Состояние оборудования
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Работает
                      </span>
                      <span className="font-semibold">1,125 (90%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        На ремонте
                      </span>
                      <span className="font-semibold">87 (7%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Списано
                      </span>
                      <span className="font-semibold">35 (3%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Модальное окно редактирования */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Icon name="Edit" size={20} className="mr-2" />
                Редактирование оборудования
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Наименование</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Тип</Label>
                <Select value={editForm.type} onValueChange={(value) => handleFormChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Компьютер">Компьютер</SelectItem>
                    <SelectItem value="Ноутбук">Ноутбук</SelectItem>
                    <SelectItem value="Принтер">Принтер</SelectItem>
                    <SelectItem value="МФУ">МФУ</SelectItem>
                    <SelectItem value="Монитор">Монитор</SelectItem>
                    <SelectItem value="Мышь">Мышь</SelectItem>
                    <SelectItem value="Клавиатура">Клавиатура</SelectItem>
                    <SelectItem value="Другое">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="building">Здание</Label>
                <Select value={editForm.building} onValueChange={(value) => handleFormChange('building', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building.id} value={building.name}>
                        {building.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Отдел</Label>
                <Select value={editForm.department} onValueChange={(value) => handleFormChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Select value={editForm.status} onValueChange={(value) => handleFormChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Работает">Работает</SelectItem>
                    <SelectItem value="На ремонте">На ремонте</SelectItem>
                    <SelectItem value="Списан">Списан</SelectItem>
                    <SelectItem value="Новый">Новый</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Серийный номер</Label>
                <Input
                  id="serialNumber"
                  value={editForm.serialNumber}
                  onChange={(e) => handleFormChange('serialNumber', e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="inventoryNumber" className="text-primary font-semibold">Инвентарный номер</Label>
                <Input
                  id="inventoryNumber"
                  value={editForm.inventoryNumber}
                  onChange={(e) => handleFormChange('inventoryNumber', e.target.value)}
                  className="font-mono border-primary/50 focus:border-primary"
                  placeholder="ИНВ-000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="specifications" className="text-primary font-semibold">Характеристики</Label>
                <Textarea
                  id="specifications"
                  value={editForm.specifications}
                  onChange={(e) => handleFormChange('specifications', e.target.value)}
                  placeholder="Технические характеристики оборудования..."
                  className="border-primary/50 focus:border-primary"
                  rows={3}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-primary font-semibold">Описание</Label>
                <Textarea
                  id="description"
                  value={editForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Описание назначения и особенностей использования..."
                  className="border-primary/50 focus:border-primary"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSaveEquipment} className="bg-primary hover:bg-primary/90">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;