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
  const [selectedBuildingFilter, setSelectedBuildingFilter] = useState('');
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

  // Состояние для карты зданий
  const [buildingsMap, setBuildingsMap] = useState([
    { id: 1, name: 'Главный офис', x: 200, y: 150, width: 120, height: 80, color: '#3B82F6' },
    { id: 2, name: 'Филиал №1', x: 400, y: 200, width: 100, height: 70, color: '#10B981' },
    { id: 3, name: 'Склад', x: 150, y: 300, width: 90, height: 60, color: '#F59E0B' },
    { id: 4, name: 'Филиал №2', x: 500, y: 100, width: 110, height: 75, color: '#8B5CF6' }
  ]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildingDetailsOpen, setBuildingDetailsOpen] = useState(false);
  const [isCreatingBuilding, setIsCreatingBuilding] = useState(false);
  const [draggedBuilding, setDraggedBuilding] = useState(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  
  // Состояние для добавления отдела
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [departmentForm, setDepartmentForm] = useState({
    name: '',
    building: '',
    employees: '',
    computers: '',
    equipment: ''
  });
  
  // Состояние для добавления оборудования
  const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false);
  const [isAddingNewType, setIsAddingNewType] = useState(false);
  const [newEquipmentType, setNewEquipmentType] = useState('');
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: '',
    department: '',
    building: '',
    status: 'Работает',
    serialNumber: '',
    inventoryNumber: '',
    specifications: '',
    description: ''
  });
  
  // Типы оборудования (можно расширять)
  const [equipmentTypes, setEquipmentTypes] = useState([
    'Компьютер',
    'Ноутбук', 
    'Принтер',
    'МФУ',
    'Монитор',
    'Телефон',
    'Планшет',
    'Проектор',
    'Сканер',
    'UPS',
    'Коммутатор',
    'Маршрутизатор'
  ]);
  
  // Состояние для отделов (делаем динамическим)
  const [departmentsData, setDepartmentsData] = useState([
    { id: 1, name: 'Бухгалтерия', building: 'Главный офис', employees: 15, computers: 15, equipment: 45 },
    { id: 2, name: 'Отдел продаж', building: 'Главный офис', employees: 22, computers: 22, equipment: 68 },
    { id: 3, name: 'IT отдел', building: 'Главный офис', employees: 8, computers: 12, equipment: 85 },
    { id: 4, name: 'Маркетинг', building: 'Филиал №1', employees: 12, computers: 12, equipment: 38 },
    { id: 5, name: 'Администрация', building: 'Главный офис', employees: 6, computers: 6, equipment: 28 }
  ]);

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

  // Обработчики для карты зданий
  const handleBuildingClick = (building: any) => {
    setSelectedBuilding(building);
    setBuildingDetailsOpen(true);
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isCreatingBuilding) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newBuilding = {
        id: Date.now(),
        name: `Новое здание ${buildingsMap.length + 1}`,
        x: x - 50,
        y: y - 30,
        width: 100,
        height: 60,
        color: '#6B7280'
      };
      
      setBuildingsMap(prev => [...prev, newBuilding]);
      setIsCreatingBuilding(false);
    }
  };

  const handleBuildingDrag = (building: any, event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = event.currentTarget.offsetParent?.getBoundingClientRect();
    if (!rect) return;

    const startX = event.clientX;
    const startY = event.clientY;
    const startBuildingX = building.x;
    const startBuildingY = building.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      setBuildingsMap(prev => prev.map(b => 
        b.id === building.id 
          ? { ...b, x: startBuildingX + deltaX, y: startBuildingY + deltaY }
          : b
      ));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Обработчик сохранения нового отдела
  const handleSaveDepartment = () => {
    if (!departmentForm.name.trim() || !departmentForm.building.trim()) {
      alert('Пожалуйста, заполните обязательные поля: название и здание');
      return;
    }

    const newDepartment = {
      id: Math.max(...departmentsData.map(d => d.id)) + 1,
      name: departmentForm.name.trim(),
      building: departmentForm.building,
      employees: parseInt(departmentForm.employees) || 0,
      computers: parseInt(departmentForm.computers) || 0,
      equipment: parseInt(departmentForm.equipment) || 0
    };

    setDepartmentsData(prev => [...prev, newDepartment]);
    
    // Сброс формы
    setDepartmentForm({
      name: '',
      building: '',
      employees: '',
      computers: '',
      equipment: ''
    });
    
    setIsAddDepartmentOpen(false);
  };

  // Обработчик добавления нового типа оборудования
  const handleAddNewType = () => {
    if (newEquipmentType.trim()) {
      setEquipmentTypes(prev => [...prev, newEquipmentType.trim()]);
      setEquipmentForm(prev => ({ ...prev, type: newEquipmentType.trim() }));
      setNewEquipmentType('');
      setIsAddingNewType(false);
    }
  };

  // Обработчик сохранения нового оборудования
  const handleSaveEquipment = () => {
    if (!equipmentForm.name.trim() || !equipmentForm.type.trim()) {
      alert('Пожалуйста, заполните обязательные поля: название и тип');
      return;
    }

    const newEquipment = {
      id: Math.max(...equipmentData.map(e => e.id)) + 1,
      name: equipmentForm.name.trim(),
      type: equipmentForm.type,
      department: equipmentForm.department,
      building: equipmentForm.building,
      status: equipmentForm.status,
      serialNumber: equipmentForm.serialNumber.trim(),
      inventoryNumber: equipmentForm.inventoryNumber.trim(),
      specifications: equipmentForm.specifications.trim(),
      description: equipmentForm.description.trim()
    };

    setEquipmentData(prev => [...prev, newEquipment]);
    
    // Сброс формы
    setEquipmentForm({
      name: '',
      type: '',
      department: '',
      building: '',
      status: 'Работает',
      serialNumber: '',
      inventoryNumber: '',
      specifications: '',
      description: ''
    });
    
    setIsAddEquipmentOpen(false);
  };

  // Обработчик экспорта данных
  const handleExport = () => {
    const exportData = {
      equipment: equipmentData,
      departments: departmentsData,
      buildings: buildings,
      exportDate: new Date().toLocaleDateString('ru-RU')
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm" onClick={() => setIsAddEquipmentOpen(true)}>
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
              <Select value={selectedBuildingFilter} onValueChange={setSelectedBuildingFilter}>
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
                  {departmentsData.map((dept) => (
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="equipment">Оборудование</TabsTrigger>
            <TabsTrigger value="map">Карта зданий</TabsTrigger>
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
                        (!selectedBuildingFilter || item.building === selectedBuildingFilter) &&
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

          {/* Карта зданий */}
          <TabsContent value="map">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Icon name="Map" size={20} className="mr-2" />
                        Интерактивная карта зданий
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant={isCreatingBuilding ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIsCreatingBuilding(!isCreatingBuilding)}
                        >
                          <Icon name="Plus" size={16} className="mr-2" />
                          {isCreatingBuilding ? 'Отменить' : 'Добавить здание'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className={`relative w-full h-96 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden ${isCreatingBuilding ? 'cursor-crosshair' : 'cursor-default'}`}
                      onClick={handleMapClick}
                      style={{ minHeight: '400px' }}
                    >
                      {/* Сетка карты */}
                      <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 20 }, (_, i) => (
                          <div key={`h-${i}`} className="absolute w-full border-t border-gray-300" style={{ top: `${i * 5}%` }} />
                        ))}
                        {Array.from({ length: 30 }, (_, i) => (
                          <div key={`v-${i}`} className="absolute h-full border-l border-gray-300" style={{ left: `${i * 3.33}%` }} />
                        ))}
                      </div>

                      {/* Здания на карте */}
                      {buildingsMap.map((building) => (
                        <div
                          key={building.id}
                          className="absolute cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                          style={{
                            left: building.x,
                            top: building.y,
                            width: building.width,
                            height: building.height,
                            backgroundColor: building.color,
                            borderRadius: '8px',
                            border: selectedBuilding?.id === building.id ? '3px solid #F59E0B' : '2px solid rgba(255,255,255,0.8)'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuildingClick(building);
                          }}
                          onMouseDown={(e) => handleBuildingDrag(building, e)}
                          onMouseEnter={() => setHoveredBuilding(building)}
                          onMouseLeave={() => setHoveredBuilding(null)}
                        >
                          <div className="flex items-center justify-center h-full text-white font-semibold text-sm text-center px-2">
                            <Icon name="Building" size={16} className="mr-1" />
                            {building.name}
                          </div>
                          
                          {/* Tooltip */}
                          {hoveredBuilding?.id === building.id && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                              {building.name}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Инструкция */}
                      {isCreatingBuilding && (
                        <div className="absolute top-4 left-4 bg-blue-100 border border-blue-300 rounded-lg p-3">
                          <p className="text-blue-800 text-sm font-medium">Кликните по карте, чтобы создать новое здание</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600">
                      <p>💡 Подсказка: Наведите курсор на здание для просмотра названия, кликните для открытия карточки, перетаскивайте для перемещения</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Панель управления */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Управление зданиями</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <p className="font-medium mb-2">Всего зданий: {buildingsMap.length}</p>
                      <div className="space-y-2">
                        {buildingsMap.map((building) => (
                          <div key={building.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: building.color }}
                              ></div>
                              <span className="text-sm">{building.name}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleBuildingClick(building)}
                            >
                              <Icon name="Eye" size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Icon name="Users" size={20} className="mr-2" />
                    Отделы организации
                  </CardTitle>
                  <Button onClick={() => setIsAddDepartmentOpen(true)}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить отдел
                  </Button>
                </div>
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
                    {departmentsData.map((dept) => (
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

        {/* Модальное окно добавления отдела */}
        <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить новый отдел
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="departmentName">Название отдела</Label>
                <Input
                  id="departmentName"
                  placeholder="Введите название отдела"
                  value={departmentForm.name}
                  onChange={(e) => setDepartmentForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="departmentBuilding">Здание</Label>
                <Select 
                  value={departmentForm.building} 
                  onValueChange={(value) => setDepartmentForm(prev => ({ ...prev, building: value }))}
                >
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
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="departmentEmployees">Количество сотрудников</Label>
                  <Input
                    id="departmentEmployees"
                    type="number"
                    placeholder="0"
                    value={departmentForm.employees}
                    onChange={(e) => setDepartmentForm(prev => ({ ...prev, employees: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="departmentComputers">Компьютеры</Label>
                  <Input
                    id="departmentComputers"
                    type="number"
                    placeholder="0"
                    value={departmentForm.computers}
                    onChange={(e) => setDepartmentForm(prev => ({ ...prev, computers: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="departmentEquipment">Всего оборудования</Label>
                  <Input
                    id="departmentEquipment"
                    type="number"
                    placeholder="0"
                    value={departmentForm.equipment}
                    onChange={(e) => setDepartmentForm(prev => ({ ...prev, equipment: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSaveDepartment}>
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Модальное окно деталей здания */}
        <Dialog open={buildingDetailsOpen} onOpenChange={setBuildingDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Icon name="Building" size={20} className="mr-2" />
                {selectedBuilding?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedBuilding && (
              <div className="py-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Информация о здании */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Информация о здании</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Название</Label>
                          <Input 
                            value={selectedBuilding.name} 
                            onChange={(e) => {
                              setBuildingsMap(prev => prev.map(b => 
                                b.id === selectedBuilding.id ? { ...b, name: e.target.value } : b
                              ));
                              setSelectedBuilding({ ...selectedBuilding, name: e.target.value });
                            }}
                          />
                        </div>
                        <div>
                          <Label>Адрес</Label>
                          <Input 
                            value={buildings.find(b => b.name === selectedBuilding.name)?.address || 'Не указан'}
                            disabled
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Цвет здания</Label>
                            <div className="flex space-x-2 mt-2">
                              {['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#6B7280'].map((color) => (
                                <button
                                  key={color}
                                  className={`w-8 h-8 rounded-full border-2 ${selectedBuilding.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                                  style={{ backgroundColor: color }}
                                  onClick={() => {
                                    setBuildingsMap(prev => prev.map(b => 
                                      b.id === selectedBuilding.id ? { ...b, color } : b
                                    ));
                                    setSelectedBuilding({ ...selectedBuilding, color });
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Отделов:</span>
                              <p className="text-lg font-bold text-primary">
                                {buildings.find(b => b.name === selectedBuilding.name)?.departments || 0}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">Оборудования:</span>
                              <p className="text-lg font-bold text-primary">
                                {buildings.find(b => b.name === selectedBuilding.name)?.equipment || 0}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Оборудование в здании */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Icon name="Package" size={18} className="mr-2" />
                          Оборудование в здании
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Статистика оборудования */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {[
                              { 
                                type: 'Компьютер', 
                                count: equipmentData.filter(e => e.building === selectedBuilding.name && e.type === 'Компьютер').length,
                                icon: 'Monitor'
                              },
                              { 
                                type: 'Принтер', 
                                count: equipmentData.filter(e => e.building === selectedBuilding.name && (e.type === 'Принтер' || e.type === 'МФУ')).length,
                                icon: 'Printer'
                              },
                              { 
                                type: 'Мониторы', 
                                count: equipmentData.filter(e => e.building === selectedBuilding.name && e.type === 'Монитор').length,
                                icon: 'Monitor'
                              },
                              { 
                                type: 'Другое', 
                                count: equipmentData.filter(e => e.building === selectedBuilding.name && !['Компьютер', 'Принтер', 'МФУ', 'Монитор'].includes(e.type)).length,
                                icon: 'Package'
                              }
                            ].map((stat, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <Icon name={stat.icon} size={16} className="text-primary" />
                                  <span className="text-sm font-medium">{stat.type}</span>
                                </div>
                                <p className="text-xl font-bold text-primary mt-1">{stat.count}</p>
                              </div>
                            ))}
                          </div>

                          {/* Список оборудования */}
                          <div className="max-h-64 overflow-y-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Название</TableHead>
                                  <TableHead>Тип</TableHead>
                                  <TableHead>Отдел</TableHead>
                                  <TableHead>Статус</TableHead>
                                  <TableHead>Инв. номер</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {equipmentData
                                  .filter(item => item.building === selectedBuilding.name)
                                  .map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                      <Badge className={getStatusBadge(item.status)}>
                                        {item.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">{item.inventoryNumber}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            {equipmentData.filter(item => item.building === selectedBuilding.name).length === 0 && (
                              <div className="text-center py-8 text-gray-500">
                                <Icon name="Package" size={48} className="mx-auto mb-2 opacity-50" />
                                <p>В этом здании пока нет оборудования</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4 border-t mt-6">
                  <Button variant="outline" onClick={() => setBuildingDetailsOpen(false)}>
                    Закрыть
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setBuildingsMap(prev => prev.filter(b => b.id !== selectedBuilding.id));
                      setBuildingDetailsOpen(false);
                      setSelectedBuilding(null);
                    }}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить здание
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Модальное окно добавления оборудования */}
        <Dialog open={isAddEquipmentOpen} onOpenChange={setIsAddEquipmentOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить оборудование
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="equipment-name">Название оборудования *</Label>
                  <Input
                    id="equipment-name"
                    value={equipmentForm.name}
                    onChange={(e) => setEquipmentForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Например: Dell OptiPlex 7090"
                  />
                </div>
                <div>
                  <Label htmlFor="equipment-type">Тип оборудования *</Label>
                  <div className="flex gap-2">
                    <Select 
                      value={equipmentForm.type} 
                      onValueChange={(value) => {
                        if (value === 'new-type') {
                          setIsAddingNewType(true);
                        } else {
                          setEquipmentForm(prev => ({ ...prev, type: value }));
                        }
                      }}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                        <SelectItem value="new-type">+ Создать новый тип</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {isAddingNewType && (
                  <div className="col-span-2">
                    <Label htmlFor="new-type">Новый тип оборудования</Label>
                    <div className="flex gap-2">
                      <Input
                        id="new-type"
                        value={newEquipmentType}
                        onChange={(e) => setNewEquipmentType(e.target.value)}
                        placeholder="Введите название нового типа"
                      />
                      <Button onClick={handleAddNewType} size="sm">
                        <Icon name="Plus" size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setIsAddingNewType(false);
                          setNewEquipmentType('');
                        }}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="equipment-department">Отдел</Label>
                  <Select 
                    value={equipmentForm.department} 
                    onValueChange={(value) => setEquipmentForm(prev => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите отдел" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentsData.map((dept) => (
                        <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="equipment-building">Здание</Label>
                  <Select 
                    value={equipmentForm.building} 
                    onValueChange={(value) => setEquipmentForm(prev => ({ ...prev, building: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите здание" />
                    </SelectTrigger>
                    <SelectContent>
                      {buildings.map((building) => (
                        <SelectItem key={building.id} value={building.name}>{building.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="equipment-status">Статус</Label>
                  <Select 
                    value={equipmentForm.status} 
                    onValueChange={(value) => setEquipmentForm(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Работает">Работает</SelectItem>
                      <SelectItem value="В ремонте">В ремонте</SelectItem>
                      <SelectItem value="Списано">Списано</SelectItem>
                      <SelectItem value="На складе">На складе</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="equipment-serial">Серийный номер</Label>
                  <Input
                    id="equipment-serial"
                    value={equipmentForm.serialNumber}
                    onChange={(e) => setEquipmentForm(prev => ({ ...prev, serialNumber: e.target.value }))}
                    placeholder="Серийный номер"
                  />
                </div>
                <div>
                  <Label htmlFor="equipment-inventory">Инвентарный номер</Label>
                  <Input
                    id="equipment-inventory"
                    value={equipmentForm.inventoryNumber}
                    onChange={(e) => setEquipmentForm(prev => ({ ...prev, inventoryNumber: e.target.value }))}
                    placeholder="ИНВ-001"
                  />
                </div>
                <div>
                  <Label htmlFor="equipment-specs">Характеристики</Label>
                  <Input
                    id="equipment-specs"
                    value={equipmentForm.specifications}
                    onChange={(e) => setEquipmentForm(prev => ({ ...prev, specifications: e.target.value }))}
                    placeholder="Intel Core i7, 16GB RAM"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="equipment-description">Описание</Label>
                <Textarea
                  id="equipment-description"
                  value={equipmentForm.description}
                  onChange={(e) => setEquipmentForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Дополнительные сведения об оборудовании"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddEquipmentOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveEquipment}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить оборудование
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;