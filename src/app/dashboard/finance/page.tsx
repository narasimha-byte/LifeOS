'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, Wallet, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/utils/date';

const incomeData = [
  { month: 'Jan', income: 5000, expenses: 3200 },
  { month: 'Feb', income: 5500, expenses: 3400 },
  { month: 'Mar', income: 6000, expenses: 3600 },
  { month: 'Apr', income: 5800, expenses: 3300 },
  { month: 'May', income: 6500, expenses: 3800 },
  { month: 'Jun', income: 7000, expenses: 3900 },
];

const expensesByCategory = [
  { name: 'Food & Groceries', value: 800, color: '#3b82f6' },
  { name: 'Transportation', value: 400, color: '#8b5cf6' },
  { name: 'Entertainment', value: 300, color: '#ec4899' },
  { name: 'Utilities', value: 300, color: '#f59e0b' },
  { name: 'Other', value: 200, color: '#10b981' },
];

const mockTransactions = [
  { id: 1, description: 'Salary', amount: 5000, type: 'income', date: '2025-01-01' },
  { id: 2, description: 'Groceries', amount: -150, type: 'expense', date: '2025-01-02' },
  { id: 3, description: 'Gas', amount: -80, type: 'expense', date: '2025-01-03' },
  { id: 4, description: 'Movie', amount: -20, type: 'expense', date: '2025-01-04' },
  { id: 5, description: 'Freelance Project', amount: 1500, type: 'income', date: '2025-01-05' },
];

export default function Finance() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const totalIncome = incomeData[incomeData.length - 1].income;
  const totalExpenses = incomeData[incomeData.length - 1].expenses;
  const savings = totalIncome - totalExpenses;

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Finance</h1>
          <p className="text-muted-foreground">Track income, expenses, and savings goals</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-white/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-500" />
                <p className="text-sm text-muted-foreground">Total Income</p>
              </div>
              <div className="text-3xl font-bold text-green-500">
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/20 bg-gradient-to-br from-red-500/10 to-rose-500/10">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-500" />
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </div>
              <div className="text-3xl font-bold text-red-500">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-muted-foreground">Net Savings</p>
              </div>
              <div className="text-3xl font-bold text-blue-500">
                {formatCurrency(savings)}
              </div>
              <p className="text-xs text-muted-foreground">{((savings / totalIncome) * 100).toFixed(1)}% of income</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Savings Trends */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Savings Trend</CardTitle>
            <CardDescription>6-month savings rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incomeData.map(d => ({ ...d, savings: d.income - d.expenses }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors border border-border/40"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={transaction.type === 'income' ? 'default' : 'outline'}
                      className="text-xs"
                    >
                      {transaction.type}
                    </Badge>
                    <span
                      className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
